from django.db import models

class Genero(models.Model):
    nome = models.CharField(max_length=255)

    def __str__(self):
        return self.nome

class Plataforma(models.Model):
    nome = models.CharField(max_length=255)

    def __str__(self):
        return self.nome

class Jogo(models.Model):
    nome = models.CharField(max_length=255)
    preco = models.DecimalField(max_digits=8, decimal_places=2)
    data_lancamento = models.DateField()
    foto_capa = models.ImageField(upload_to='capas/')
    destaque = models.BooleanField(default=False)
    descricao = models.CharField(max_length=255, null=True,blank=True,default="Sem descrição")

    genero = models.ForeignKey(Genero, on_delete=models.CASCADE, related_name='jogos')
  
    plataformas = models.ManyToManyField(Plataforma, related_name='jogos' )

    def __str__(self):
        return self.nome



class Avaliacao(models.Model):
    jogo = models.ForeignKey(Jogo,on_delete=models.CASCADE,related_name='avaliacoes')

    nome_visitante = models.CharField(max_length=255)

    nota = models.IntegerField(
        choices=[
            (1, '1 estrela'),
            (2, '2 estrelas'),
            (3, '3 estrelas'),
            (4, '4 estrelas'),
            (5, '5 estrelas'),
        ]
    )

    comentario = models.TextField()

    def __str__(self):
        return f"{self.nome_visitante} - {self.jogo.nome}"
