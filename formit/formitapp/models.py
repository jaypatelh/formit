from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Dance(models.Model):
	title = models.CharField("Title", max_length=25)
	foreign_id = models.CharField() # foreign id to mongodb
	creator = models.ForeignKey('User')