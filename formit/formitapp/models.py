from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Person(models.Model):
	username = models.CharField("Username", max_length=25, unique=True)
	user = models.OneToOneField(User)

class Dance(models.Model):
	title = models.CharField("Title", max_length=25)
	foreign_id = models.IntegerField()
	creator = models.ForeignKey('Person')