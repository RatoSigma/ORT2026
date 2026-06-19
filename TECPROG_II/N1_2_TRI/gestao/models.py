from django.db import models


class Turma(models.Model):
    nome = models.CharField(max_length=50)
    ano_letivo = models.PositiveIntegerField()
    sala = models.CharField(max_length=20)
    turno = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.nome} - {self.ano_letivo}"


class Disciplina(models.Model):
    nome = models.CharField(max_length=100)
    carga_horaria = models.PositiveIntegerField()
    ativa = models.BooleanField(default=True)

    def __str__(self):
        return self.nome


class Aluno(models.Model):
    nome = models.CharField(max_length=100)
    matricula = models.CharField(max_length=20, unique=True)
    email = models.EmailField(blank=True)
    data_nascimento = models.DateField()
    turma = models.ForeignKey(
        Turma,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="alunos",
    )
    disciplinas = models.ManyToManyField(
        Disciplina,
        blank=True,
        related_name="alunos",
    )
    data_cadastro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nome} ({self.matricula})"
