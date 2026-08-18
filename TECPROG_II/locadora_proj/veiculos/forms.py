from django import forms

from .models import Automovel


class AutomovelForm(forms.ModelForm):
    class Meta:
        model = Automovel
        fields = ["placa", "marca", "modelo", "ano", "cor", "valor_diaria"]
