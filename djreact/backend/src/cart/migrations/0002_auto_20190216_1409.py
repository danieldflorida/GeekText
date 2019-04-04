# Generated by Django 2.1.5 on 2019-02-16 19:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0002_book_cover'),
        ('cart', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shoppingcart',
            name='itemsInCart',
        ),
        migrations.AddField(
            model_name='shoppingcart',
            name='itemsInCart',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='books', to='books.Book'),
        ),
    ]