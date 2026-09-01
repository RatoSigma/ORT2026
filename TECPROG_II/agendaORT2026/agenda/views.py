from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from .models import Contato
from .forms import ContatoForm

def ola_mundo(request):
    return HttpResponse('<p>Olá! Está é minha primeira view com DJANGO!</p>')

def pagina_inicial(request):
    return render(request, 'agenda/index.html')

def contato_lista(request):
    contatos = Contato.objects.all()
    return render(request, 'agenda/contatos_lista.html', {'contatos' : contatos})

def contato_criar(request):
    if request.method == 'POST':
        form = ContatoForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('agenda:contato_lista')
    else:
        form = ContatoForm()
    return render(request, 'agenda/contato_form.html', {'form' : form})

def contato_detalhe(request, pk):
    contato = get_object_or_404(Contato, pk=pk)
    return render(request, 'agenda/contato_detalhe.html', {'contato': contato})

def contato_editar(request, pk):
    contato = get_object_or_404(Contato, pk=pk)
    if request.method == 'POST':
        form = ContatoForm(request.POST, instance=contato)
        if form.is_valid():
            form.save()
            return redirect('agenda:contato_detalhe', pk=contato.pk)
    else:
        form = ContatoForm(instance=contato)
    return render(request, 'agenda/contato_form.html', {'form': form})

def contato_apagar(request, pk):
    contato = get_object_or_404(Contato, pk=pk)
    if request.method == 'POST':
        contato.delete()
        return redirect('agenda:contato_lista')
    return render(request, 'agenda/contato_confirmar_exclusao.html', {'contato': contato})