# Generated by Django 3.2.8 on 2022-10-01 11:13

from django.db import migrations, models
import django.db.models.deletion
import django.db.models.expressions


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_auto_20221001_1248'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='content',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='date_created',
        ),
        migrations.AddField(
            model_name='blog',
            name='comments',
            field=models.ManyToManyField(related_name='_blog_blog_comments_+', through='blog.Comment', to='blog.Blog'),
        ),
        migrations.AddField(
            model_name='comment',
            name='comment',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='comment', to='blog.blog'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='blog',
            field=models.ForeignKey(null=True, on_delete=django.db.models.expressions.Case, related_name='blog', to='blog.blog'),
        ),
    ]
