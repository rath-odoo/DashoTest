from django.db import models

# Create your models here.


class Content(models.Model):
    bookname = models.CharField(max_length=100);
    def __str__(self):
        return self.bookname


class Question(models.Model):
    name = models.CharField(max_length=100);



class Exercise(models.Model):
    name = models.CharField(max_length=100);
    questions = models.ManyToManyField(Question,blank=True);




class Sentence(models.Model):
    text = models.CharField(max_length=300);


class Paragraph(models.Model):
    sentences = models.ManyToManyField(Sentence,blank=True);


class BookSubSection(models.Model):
     name = models.CharField(max_length=200);
     paragraphs = models.ManyToManyField(Paragraph,blank=True);
     sectionid = models.IntegerField(blank=True,null=True);

class BookSectionNumber(models.Model):
      sectionno = models.FloatField(blank=True, null=True);



class Figure(models.Model):
    name = models.CharField(max_length=200);
    caption = models.CharField(max_length=300);
    def __str__(self):
        return self.name


class Table(models.Model):
    name = models.CharField(max_length=200);
    caption = models.CharField(max_length=300);
    def __str__(self):
        return self.name





class BookSection(models.Model):
    name=models.CharField(max_length=200);
    paragraphs = models.ManyToManyField(Paragraph,blank=True);
    subsections = models.ManyToManyField(BookSubSection, blank=True);
    chapterid = models.IntegerField(blank=True,null=True);
    sectionnum = models.ForeignKey(BookSectionNumber, on_delete=models.CASCADE,null=True,blank=True)
    figures = models.ManyToManyField(Figure, blank=True);
    tables = models.ManyToManyField(Table, blank=True);
    def __str__(self):
        return self.name



class BookChapterNumber(models.Model):
      chapterno = models.IntegerField(blank=True, null=True);


class BookChapter(models.Model):
    name=models.CharField(max_length=100);
    chapternum = models.ForeignKey(BookChapterNumber, on_delete=models.CASCADE,null=True, blank=True);
    sections = models.ManyToManyField(BookSection, blank=True);
    bookid = models.IntegerField(blank=True, null=True);
    exercises = models.ForeignKey(Exercise, on_delete=models.CASCADE,null=True, blank=True);
    class Meta:
        ordering = ('chapternum',)

    def __str__(self):
        return self.name



def get_default_bookCoverImage():
        return "codingwithmitch/logo_1080_1080.png"


class Book(models.Model):
    name = models.CharField(max_length=100);
    author = models.CharField(max_length=100);
    coverImage = models.ImageField(max_length=255, upload_to='images/', null=True, blank=True, default=get_default_bookCoverImage);
    chapters = models.ManyToManyField(BookChapter,blank=True)
    content = models.ForeignKey(Content, on_delete=models.CASCADE,null=True, blank=True)
    def __str__(self):
        return self.name

      


class ImageUploadTest(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True);
    coverimage = models.ImageField(max_length=255, upload_to='images/', null=True, blank=True, default=get_default_bookCoverImage);
    




