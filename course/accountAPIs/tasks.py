# tasks.py
from celery import Celery
from celery import shared_task
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta
from account.models import Account
from .models import Video
import boto3
from django.conf import settings
from django.core.files.storage import default_storage
import os


try:
    import ffmpeg
except ImportError:
    import pip
    pip.main(['install', 'ffmpeg-python'])
    import ffmpeg

#app = Celery('myproject')
#app.config_from_object('django.conf:settings', namespace='CELERY')


@shared_task
def send_email_task(subject, body, sender, recipients):
   send_mail(subject, body, sender, recipients)



@shared_task
def send_test_email():
    subject = 'Test Email'
    message = 'This is a test email sent via Celery.'
    from_email = 'info.diracai@gmail'  # Replace with your email
    recipient_list = ['bibhu.phy@gmail.com']  # Replace with recipient's email

    send_mail(subject, message, from_email, recipient_list)

@shared_task
def delete_old_profiles():
    threshold_date = timezone.now() - timedelta(days=90)
    accounts_to_delete = Account.objects.filter(is_delete_request_raised=True, delete_request_raised_at__lt=threshold_date)
    
    for account in accounts_to_delete:
        account.delete()

s3_client = boto3.client(
    's3',
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    endpoint_url=settings.AWS_S3_ENDPOINT_URL
)

@shared_task
def upload_video_to_s3(video_id):
    video = Video.objects.get(id=video_id)

    try:
        # Use the storage backend to open the file
        with default_storage.open(video.file.name, 'rb') as file:
            # Upload the video to DigitalOcean Spaces
            s3_client.upload_fileobj(file, settings.AWS_STORAGE_BUCKET_NAME, f"{settings.AWS_LOCATION}/{video.file.name}")
        
        # Generate a signed URL
        signed_url = s3_client.generate_presigned_url(
            'get_object',
            Params={
                'Bucket': settings.AWS_STORAGE_BUCKET_NAME,
                'Key': f"{settings.AWS_LOCATION}/{video.file.name}"
            },
            ExpiresIn=3600  # URL expiration time in seconds
        )
        
        # Save the signed URL to the video object
        video.signed_url = signed_url
        video.save()
        
        # Trigger the video processing task
        process_video.delay(video.id)
    except Exception as e:
        # Handle any exceptions that occur during the upload
        print(f"Error uploading video {video_id} to S3: {e}")

@shared_task
def process_video(video_id):
    video = Video.objects.get(id=video_id)
    temp_dir = "/tmp/videos"
    os.makedirs(temp_dir, exist_ok=True)
    
    temp_input_path = None
    temp_output_path = None
    
    try:
        # Use the storage backend to open the file for processing
        with default_storage.open(video.file.name, 'rb') as file:
            # Download the file to a temporary location for processing
            temp_input_path = os.path.join(temp_dir, os.path.basename(video.file.name))
            with open(temp_input_path, 'wb') as temp_file:
                temp_file.write(file.read())
            
            # Define output path
            temp_output_path = temp_input_path.replace('.mov', '.mp4')  # Assuming input is .mov, change as needed

            # Use ffmpeg to convert the video format
            ffmpeg.input(temp_input_path).output(temp_output_path).run()
            
            # Upload the processed video back to S3
            with open(temp_output_path, 'rb') as processed_file:
                s3_client.upload_fileobj(processed_file, settings.AWS_STORAGE_BUCKET_NAME, f"{settings.AWS_LOCATION}/{os.path.basename(temp_output_path)}")
            
            # Update the video file path to the new format
            video.file.name = f"{settings.AWS_LOCATION}/{os.path.basename(temp_output_path)}"
            video.processed = True
            
            # Generate a signed URL for the processed file
            signed_url = s3_client.generate_presigned_url(
                'get_object',
                Params={
                    'Bucket': settings.AWS_STORAGE_BUCKET_NAME,
                    'Key': f"{settings.AWS_LOCATION}/{os.path.basename(temp_output_path)}"
                },
                ExpiresIn=3600  # URL expiration time in seconds
            )
            
            video.signed_url = signed_url
            video.save()
    except Exception as e:
        # Handle any exceptions that occur during processing
        print(f"Error processing video {video_id}: {e}")
    finally:
        # Clean up temporary files
        if temp_input_path and os.path.exists(temp_input_path):
            os.remove(temp_input_path)
        if temp_output_path and os.path.exists(temp_output_path):
            os.remove(temp_output_path)
