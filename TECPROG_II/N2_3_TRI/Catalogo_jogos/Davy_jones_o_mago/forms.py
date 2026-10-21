from django import forms
from .models import Jogo


class JogoForm(forms.ModelForm):
    class Meta:
        model = Jogo
        fields = ['nome','preco','data_lancamento','foto_capa','destaque','genero','plataformas',]

