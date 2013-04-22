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

def home(request):
  c = Context({ "WHO": "WORLD!!!" })
  if(request.user.is_authenticated()):
    return render_to_response("index.html", c, context_instance=RequestContext(request))
  else:
    return HttpResponseRedirect("/login_user")
	

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
    request.session['username'] = username
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