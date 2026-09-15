from django.shortcuts import render, redirect, get_object_or_404
from .models import Bolo
from .forms import BoloForm

def bolo_lista(request):
    bolos = Bolo.objects.all()
    return render(request, 'catalogo/lista.html', {'bolos': bolos})

def bolo_criar(request):
    if request.method == 'POST':
        form = BoloForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('catalogo:bolo_lista')
    else:
        form = BoloForm()
    return render(request, 'catalogo/form.html', {'form': form})

def bolo_detalhe(request, pk):
    bolo = get_object_or_404(Bolo, pk=pk)
    return render(request, 'catalogo/detalhe.html', {'bolo': bolo})

def bolo_editar(request, pk):
    bolo = get_object_or_404(Bolo, pk=pk)
    if request.method == 'POST':
        form = BoloForm(request.POST, instance=bolo)
        if form.is_valid():
            form.save()
            return redirect('catalogo:bolo_detalhe', pk=bolo.pk)
    else:
        form = BoloForm(instance=bolo)
    return render(request, 'catalogo/form.html', {'form': form, 'bolo': bolo})

def bolo_apagar(request, pk):
    bolo = get_object_or_404(Bolo, pk=pk)
    if request.method == 'POST':
        bolo.delete()
        return redirect('catalogo:bolo_lista')
    return render(request, 'catalogo/delete.html', {'bolo': bolo})
