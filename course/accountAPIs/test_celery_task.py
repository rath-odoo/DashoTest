import unittest                                #it works across any Python code.
from accountAPIs.tasks import send_email_task

class CeleryTaskTestCase(unittest.TestCase):
    def test_send_email_task(self):
        # Replace with your actual email details
        subject = "Test Subject"
        body = "Test Body"
        sender = "diracai.info@gmail.com"
        recipients = ["bibhu.phy@gmail.com"]

        # Execute the Celery task asynchronously
        result = send_email_task.delay(subject, body, sender, recipients)

        print(f"Task ID: {result.id}")

if __name__ == '__main__':
    unittest.main()

# test_celery_task.py
# # from tasks import send_email_task
# from accountAPIs.tasks import send_email_task


# # Replace with your actual email details
# subject = "Test Subject"
# body = "Test Body"
# sender = "diracai.info@gmail.com"
# recipients = ["bibhu.phy@gmail.com"]

# # Execute the Celery task asynchronously
# result = send_email_task.delay(subject, body, sender, recipients)

# print(f"Task ID: {result.id}")





