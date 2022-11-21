# Generated by Django 3.2.8 on 2022-11-12 15:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0011_auto_20221104_1019'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag', models.CharField(max_length=120)),
                ('blog', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='blog.blog')),
            ],
        ),
    ]
