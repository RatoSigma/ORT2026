
from django.urls import path
from . import views

app_name = 'jogos'

urlpatterns = [
    path('', views.pagina_inicial, name='pagina_inicial'),
    path('jogo/<int:pk>/',views.detalhes_jogo,name='detalhes_jogo'),
    path('dashboard/',views.dashboard,name='dashboard'),
    path('dashboard/novo/',views.novo_jogo,name='novo_jogo'),
    path('dashboard/editar/<int:pk>/',views.editar_jogo,name='editar_jogo'),
    path('dashboard/apagar/<int:pk>/',views.apagar_jogo,name='apagar_jogo'),
]
