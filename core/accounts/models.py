from django.db import models
from django.contrib.auth.models import (
				AbstractBaseUser,
				PermissionsMixin,
				BaseUserManager
	)
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail  
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.db.models.signals import post_save 
from PIL import Image
from colorfield.fields import ColorField



class AccountManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None):
        if not email:
            raise ValueError('User must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name)

        user.set_password(password)
        user.save(using=self._db)
        return user 

    def create_superuser(self, email, first_name, last_name, password):
        user = self.create_user(email, first_name, last_name, password)
        user.is_superuser = True 
        user.is_staff =  True 

        user.save(using=self._db)
        return user 

class Account(AbstractBaseUser, PermissionsMixin):
	""" Database model for users in the system """

	email               = models.EmailField(max_length=255, unique=True)
	first_name          = models.CharField(max_length=50)
	last_name           = models.CharField(max_length=50)
	date_joined         = models.DateTimeField(auto_now_add=True)

	is_staff            = models.BooleanField(default=False)
	is_superuser        = models.BooleanField(default=False)
	# is_admin            = models.BooleanField(default=False)

	objects = AccountManager() 

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['first_name', 'last_name']
	

	def get_full_name(self):
		return f"{self.first_name} {self.last_name}".title()

	def joined_date(self):
		date = self.date_joined.strftime("%d %b %Y")
		return f"{date}"

	def __str__(self):
		""" Return string representation of our user """
		return self.email


class Tag(models.Model):
    name                = models.CharField(max_length=100, unique=True)
    description         = models.TextField(blank=True)
    # color               = models.CharField(max_length=100, null=True)
    color               = ColorField(default='#FF0000')

    def __str__(self) -> str:
        return self.name




class Profile(models.Model):
    user                = models.OneToOneField(Account, on_delete=models.CASCADE, null=True)
    profile_image       = models.ImageField(default='default.jpg', upload_to = "profile_images")
    followers           = models.ManyToManyField(Account, related_name='followers')
    following_tags      = models.ManyToManyField(Tag, related_name='tags')
    
    def user_posts_count(self):
        return self.user.blog_blog_author.count()


    def __str__(self) -> str:
        return self.user.first_name + ' Profile'
    
    def save(self, *args, **kwargs):
        super().save()

        img = Image.open(self.profile_image.path)
        if img.height > 400 or img.width > 400:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.profile_image.path)



def post_save_profile_create(sender, instance, created, *args, **kwargs):
    if created:
        Profile.objects.get_or_create(user=instance)


post_save.connect(post_save_profile_create, sender=Account)


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    current_site = get_current_site(instance.request)
    print(current_site)
    # send an e-mail to the user
    context = {
        # 'current_user': reset_password_token.user,
        'username': reset_password_token.user.get_full_name(),
        'email': reset_password_token.user.email,
        'reset_password_url': "http://{}token={}".format(
            f"{current_site}/#/reset-password/",
            reset_password_token.key)
    }

    # render email text
    email_html_message = render_to_string('accounts/user_reset_password.html', context)
    email_plaintext_message = render_to_string('accounts/user_reset_password.txt', context)

    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for {title}".format(title="Blog account"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@blog.yourspace.com",
        # to:
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()