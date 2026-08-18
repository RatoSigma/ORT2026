from django.shortcuts import redirect, render

from .forms import AutomovelForm
from .models import Automovel


def lista_automoveis(request):
    automoveis = Automovel.objects.all()
    return render(
        request,
        "veiculos/lista_automoveis.html",
        {"automoveis": automoveis},
    )


def adicionar_automovel(request):
    if request.method == "POST":
        form = AutomovelForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("veiculos:lista_automoveis")
    else:
        form = AutomovelForm()

    return render(
        request,
        "veiculos/adicionar_automovel.html",
        {"form": form},
    )
