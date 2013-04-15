# Create your views here.
from django.core.context_processors import request  
from django.shortcuts import render_to_response  
from django.template.context import Context, RequestContext  
def home(request):  
      
    c = Context({ "WHO": "WORLD!!!"  
                 })  
    return render_to_response("index.html", c, context_instance=RequestContext(request))