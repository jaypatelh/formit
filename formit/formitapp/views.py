# Create your views here.
from django.core.context_processors import request  
from django.shortcuts import render_to_response  
from django.template.context import Context, RequestContext
from django.forms import ModelForm
from django import forms
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout, views
from models import *
import os
from django.core.validators import MaxLengthValidator
import pymongo
from pymongo import MongoClient
from bson.objectid import ObjectId

def home(request):
  if(request.user.is_authenticated()):
    return render_to_response("index.html", context_instance=RequestContext(request))
  else:
    return HttpResponseRedirect("/login_user")

def dance(request):
  c = Context({ "WHO": "WORLD!!!" })
  return render_to_response("index.html", c, context_instance=RequestContext(request))	

def register_user(request):
  if request.method == 'POST':
    form = RegisterForm(request.POST)
    if form.is_valid():
      username = form.cleaned_data['username']
      password = form.cleaned_data['password']
      user = User.objects.create_user(username=username, password=password)
      user.save()
  else:
    form = RegisterForm()
  return render(request, 'register.html', {
    'form': form
  })

def login_user(request):
  if request.method == 'POST': # If the form has been submitted...
    form = LoginForm(request.POST) # A form bound to the POST data
    if form.is_valid(): # All validation rules pass
        username = request.POST['username']
        password = request.POST['password']
        return login_helper(request, username, password)
  else:
      form = LoginForm()
  
  return render(request, 'login.html', {
    'form': form
  })

def login_helper(request, username, password):
  user = authenticate(username=username, password=password)
  if user is not None and user.is_active:
    login(request, user)
    request.session['user'] = user
    return HttpResponse('successful login')
  return HttpResponse('fail login')

class UserNameField(forms.CharField):
  def __init__(self):
    self.max_length = 25
    super(UserNameField, self).__init__(validators=[MaxLengthValidator(25)])

  def to_python(self, value):
    return value

class RegisterForm(forms.Form):
  username = UserNameField()
  password = forms.CharField(widget=forms.PasswordInput())

class LoginForm(forms.Form):
  username = forms.CharField(max_length=100)
  password = forms.CharField(widget=forms.PasswordInput())

def testMongo(request):
  client = MongoClient() # might need to specify host and port on Heroku
  db = client.formitdb
  dancedata = db.dancedata
  obj = {"yo": "bro", "how": "you"}
  dancedata.insert(obj)
  return HttpResponse('successfully inserted into mongo')

def new_dance(request):
  title = request.POST['title']
  dance = Dance(title = title, creator = request.session['user'])
  dance.save()
  return HttpResponseRedirect("/dance/"+dance.id)

def dance(request, dance_id):
  dance_obj = Dance.objects.filter(id=dance_id)
  if request.user.is_authenticated():
    if dance_obj.foreign_id: # if the dance already exists in mongo
      # initialize connection to mongo
      client = MongoClient()
      db = client.formitdb
      dancedata = db.dancedata
      data = dancedata.find_one({"_id":ObjectId(dance_obj.foreign_id)}).data
      c = Context({"data": data})
      return render_to_response("index.html", c, context_instance=RequestContext(request))
    else: # if the dance is new, not saved yet
      return render(request, "index.html")
  else:
    return HttpResponseRedirect("/login_user")

def save_dance(request, dance_id):
  data = request.POST['data'] # data containing the dance data from front end

  # initialize connection to mongo
  client = MongoClient()
  db = client.formitdb
  dancedata = db.dancedata

  # query sqlite for dance object
  dance_obj = Dance.objects.filter(id=dance_id)
  
  if not dance_obj.foreign_id: # if saving for the first time
    data_id = dancedata.insert({"data": data}) # insert into mongo
    dance_obj.foreign_id = str(data_id) # save the id of the recently added mongo item in the local sqlite database
    dance_obj.save()
  else: # if saved before
    foreign_id = ObjectId(dance_obj.foreign_id)
    dancedata.update({"_id": foreign_id}, {"data": data})

  return HttpResponse("saved dance successfully")
