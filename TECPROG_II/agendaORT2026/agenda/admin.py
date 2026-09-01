from django.contrib import admin
from agenda.models import Contato, Categoria, Tag

# Register your models here.
admin.site.register(Contato)
admin.site.register(Categoria)
admin.site.register(Tag)