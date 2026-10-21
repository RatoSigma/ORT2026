
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Jogo
from .forms import JogoForm

def pagina_inicial(request):
    jogo_destaque = Jogo.objects.filter(
        destaque=True
    ).first()

    jogos = Jogo.objects.filter(
        destaque=False
    )

    return render(
        request,
        'Davy_jones_o_mago/pagina_inicial.html',
        {
            'jogo_destaque': jogo_destaque,
            'jogos': jogos,
        }
    )



def detalhes_jogo(request, pk):
    jogo = get_object_or_404(Jogo, pk=pk)

    return render(
        request,
        'Davy_jones_o_mago/detalhes_jogo.html',
        {'jogo': jogo}
    )

@login_required
def dashboard(request):
    jogos = Jogo.objects.all()

    return render(
        request,
        'Davy_jones_o_mago/dashboard.html',
        {'jogos': jogos}
    )

@login_required
def novo_jogo(request):
    if request.method == 'POST':
        form = JogoForm(request.POST, request.FILES)

        if form.is_valid():
            form.save()
            return redirect('jogos:dashboard')
    else:
        form = JogoForm()

    return render(
        request,
        'Davy_jones_o_mago/jogo_form.html',
        {'form': form}
    )

@login_required
def editar_jogo(request, pk):
    jogo = get_object_or_404(Jogo, pk=pk)

    if request.method == 'POST':
        form = JogoForm(request.POST,request.FILES,instance=jogo)

        if form.is_valid():
            form.save()
            return redirect('jogos:dashboard')
    else:
        form = JogoForm(instance=jogo)

    return render(
        request,
        'Davy_jones_o_mago/jogo_form.html',
        {'form': form}
    )


@login_required
def apagar_jogo(request, pk):
    jogo = get_object_or_404(Jogo, pk=pk)

    if request.method == 'POST':
        jogo.delete()
        return redirect('jogos:dashboard')

    return render(
        request,
        'Davy_jones_o_mago/confirmar_exclusao.html',
        {'jogo': jogo}
    )
