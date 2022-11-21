from email.policy import default
from pdb import post_mortem
from typing_extensions import Required
from django.db import models
from django.contrib.auth import get_user_model 
from PIL  import Image 
from accounts.models import Tag

User = get_user_model()

# Abstract shared model 

class SharedModel(models.Model):
    author                  = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="%(app_label)s_%(class)s_author")
    content                 = models.TextField() 
    date_created            = models.DateTimeField(auto_now_add=True)
    likes                   = models.ManyToManyField(User, related_name="%(app_label)s_%(class)s_likes", blank=True)

    class Meta:
        abstract = True
        ordering = ('-date_created', )

        

    def pub_date(self):
        return self.date_created.strftime("%d %b %Y")


# Blog
class Blog(SharedModel):  
    title                   = models.CharField(max_length=220)
    cover_image             = models.ImageField(default='cover.jpg', upload_to='cover_images')
    blog_tags               = models.ManyToManyField(Tag, related_name='blog_tags')


    def __str__(self) -> str:
        return f'{self.title} Blog'
        

    def save(self, *args, **kwargs):
        super().save()

        img = Image.open(self.cover_image.path)
        if img.height > 600 or img.width > 600:
            output_size = (1200, 600)
            img.thumbnail(output_size)
            img.save(self.cover_image.path)


# Comment
class Comment(SharedModel):
    blog                = models.ForeignKey(Blog, on_delete=models.Case, related_name='comments', null=True)

    def __str__(self) -> str:
        return f'{self.blog}  Comment'


class Reply(SharedModel):
    comment                = models.ForeignKey(Comment, on_delete=models.Case, related_name='replies', null=True)

    def __str__(self) -> str:
        return f'{self.comment}  Reply'

