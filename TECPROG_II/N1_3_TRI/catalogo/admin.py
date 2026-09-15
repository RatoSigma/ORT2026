from multiprocessing.resource_tracker import register

from django.contrib import admin

from .models import Bolo

# Register your models here.
admin.site.register(Bolo)

