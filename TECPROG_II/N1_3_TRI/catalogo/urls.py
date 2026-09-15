from django.urls import path
from . import views

app_name = 'catalogo'

urlpatterns = [
    path('', views.bolo_lista, name='bolo_lista'),
    path('novo/', views.bolo_criar, name='bolo_criar'),
    path('<int:pk>/', views.bolo_detalhe, name='bolo_detalhe'),
    path('<int:pk>/editar/', views.bolo_editar, name='bolo_editar'),
    path('<int:pk>/apagar/', views.bolo_apagar, name='bolo_apagar'),
]
