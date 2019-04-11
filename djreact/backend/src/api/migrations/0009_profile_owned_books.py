# Generated by Django 2.1.5 on 2019-04-01 16:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_cart_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='owned_books',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='owned_books', to='api.Book'),
        ),
    ]