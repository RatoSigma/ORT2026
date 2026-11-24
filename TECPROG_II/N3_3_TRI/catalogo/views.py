# catalogo/views.py
from django.shortcuts import render, redirect, get_object_or_404
from .models import Bolo
from .forms import BoloForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.db.models import Q
from django.core.paginator import Paginator

def registrar_usuario(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        form.fields['username'].help_text = ''
        form.fields['password1'].help_text = ''
        form.fields['password2'].help_text = ''
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = UserCreationForm()
        form.fields['username'].help_text = ''
        form.fields['password1'].help_text = ''
        form.fields['password2'].help_text = ''

    return render(request, 'registration/register.html', {'form': form})

def pagina_inicial(request):
    return render(request, 'catalogo/index.html')

def lista_bolos(request):
    bolos = Bolo.objects.all().order_by('nome')

    busca = request.GET.get('q')
    if busca:
        bolos = bolos.filter(
            Q(nome__icontains=busca) | Q(sabor__icontains=busca)
        )

    paginador = Paginator(bolos, 3)
    numero_pagina = request.GET.get('page')
    pagina = paginador.get_page(numero_pagina)

    return render(request,
                  'catalogo/lista_bolos.html',
                  {'pagina' : pagina})

@login_required()
def novo_bolo(request):
    if request.method == 'POST':
        form = BoloForm(request.POST, request.FILES)

        if form.is_valid():
            form.save()
            return redirect('catalogo:lista_bolos')
    else:
        form = BoloForm()

    return render(request,
                   'catalogo/bolo_form.html',
                   {'form' : form})


def detalhe_bolo(request, pk):
    # 1. Os Detalhes do Bolo
    bolo = get_object_or_404(Bolo, pk=pk)
    return render(request, 'catalogo/detalhe_bolo.html', {'bolo': bolo})


@login_required()
def editar_bolo(request, pk):
    # 2. Atualização do Estoque
    bolo = get_object_or_404(Bolo, pk=pk)

    if request.method == 'POST':
        form = BoloForm(request.POST, request.FILES, instance=bolo)
        if form.is_valid():
            form.save()
            return redirect('catalogo:detalhe_bolo', pk=bolo.pk)
    else:
        form = BoloForm(instance=bolo)

    return render(request, 'catalogo/bolo_form.html', {'form': form})

@login_required()
def apagar_bolo(request, pk):
    # 3. Fim de Linha (Excluir)
    bolo = get_object_or_404(Bolo, pk=pk)

    if request.method == 'POST':
        bolo.delete()
        return redirect('catalogo:lista_bolos')

    return render(request, 'catalogo/bolo_confirmar_exclusao.html', {'bolo': bolo})

