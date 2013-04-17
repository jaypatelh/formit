from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'formit.views.home', name='home'),
    # url(r'^formit/', include('formit.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),

    url(r'^$', 'formitapp.views.home', name='home'),
    url(r'^login_user$', 'formitapp.views.login_user', name='login_user'),
    url(r'^register_user$', 'formitapp.views.register_user'),
)
