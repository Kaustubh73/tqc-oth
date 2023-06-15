from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = None
    solved_count = models.IntegerField(default=0)
    solved_puzzles = models.TextField(blank=True)

    def add_solved_puzzle(self, puzzle_id):
        if not self.solved_puzzles:
            self.solved_puzzles = str(puzzle_id)
        else:
            solved_puzzles_list = self.solved_puzzles.split(',')
            if str(puzzle_id) not in solved_puzzles_list:
                solved_puzzles_list.append(str(puzzle_id))
                self.solved_puzzles = ','.join(solved_puzzles_list)
        self.save()

    def has_solved_puzzle(self, puzzle_id):
        if not self.solved_puzzles:
            return False
        solved_puzzles_list = self.solved_puzzles.split(',')
        return str(puzzle_id) in solved_puzzles_list
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


    def save(self, *args, **kwargs):
        # Check if the user is being created for the first time
        if not self.pk:
            self.solved_count = 0  # Set solved_count to zero for new users

        super().save(*args, **kwargs)
