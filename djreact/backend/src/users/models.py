from django.db import models

# Create your models here.

class Users(models.Model):
    username = models.CharField(primary_key=True, max_length=24) 
    password = models.CharField(max_length=24)
    email = models.CharField(max_length=32)
    class Meta:
        verbose_name_plural = "Users"

    def __str__(self):
        return self.username
