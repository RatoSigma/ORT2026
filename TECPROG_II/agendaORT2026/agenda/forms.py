from django import forms
from .models import Contato

class ContatoForm(forms.ModelForm):
    class Meta:
        #Em qual modelo o form sera criado
        model = Contato

        #Quais campos serao exibidos no forms
        fields = ['nome', 'telefone', 'email', 'data_nascimento',
                  'categoria', 'tag']

        #Como o campo será exibido no form
        widgets = {
            'data_nascimento' : forms.DateInput(attrs={'type' : 'date'})
        }