from django.conf.urls import url
from . import views

urlpatterns = [
                # Examples:
                # url(r'^$', 'firstapp.views.home', name='home'),
                # url(r'^blog/', include('blog.urls')),

                url(r'^login/$', views.login, name='login'),
                url(r'^logout/$', views.logout, name='logout'),
                url(r'^register/$', views.register, name='register'),
]
