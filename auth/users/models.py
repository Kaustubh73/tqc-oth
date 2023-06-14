from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = None
    solved_count = models.IntegerField(default=0)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


    def save(self, *args, **kwargs):
        # Check if the user is being created for the first time
        if not self.pk:
            self.solved_count = 0  # Set solved_count to zero for new users

        super().save(*args, **kwargs)