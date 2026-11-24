# catalogo/urls.py
from django.urls import path
from . import views

app_name = 'catalogo'

urlpatterns = [
    # Rotas do Módulo 2
    path('', views.pagina_inicial, name='home'),
    path('bolos/', views.lista_bolos, name='lista_bolos'),
    path('bolos/novo/', views.novo_bolo, name='novo_bolo'),

    # Novas rotas do Módulo 3
    path('bolos/<int:pk>/', views.detalhe_bolo, name='detalhe_bolo'),
    path('bolos/<int:pk>/editar/', views.editar_bolo, name='editar_bolo'),
    path('bolos/<int:pk>/apagar/', views.apagar_bolo, name='apagar_bolo'),
]