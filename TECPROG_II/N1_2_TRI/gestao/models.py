from django.db import models

class alunos(models.Model):
    nome = models.CharField(max_length=100)
    serie = models.CharField(max_length=20)
    data_de_nascimento = models.DateField()
    data_adicionamento = models.DateTimeField(auto_now_add=True)

class funcionarios(models.Model):
    nome = models.CharField(max_length=100)
    telefone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    endereco = models.TextField(blank=True, null=True)
    cpf = models.IntegerField()
    data_nascimento = models.DateField()
    cargo = models.CharField(max_length=50)
    data_adicionamento = models.DateTimeField(auto_now_add=True)


class GrupoPai(models.Model):
    nome = models.CharField(max_length=100)
    def __str__(self):
        return self.nome

class CaracteristicaNxM(models.Model):
    nome = models.CharField(max_length=100)
    def __str__(self):
        return self.nome

class ItemPrincipal(models.Model):
    nome = models.CharField(max_length=255)
    grupo = models.ForeignKey(GrupoPai, on_delete=models.SET_NULL, null=True, blank=True)
    caracteristicas = models.ManyToManyField(CaracteristicaNxM, blank=True
    def __str__(self):
        return self.nome