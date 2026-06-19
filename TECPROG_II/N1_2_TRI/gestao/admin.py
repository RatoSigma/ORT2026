from django.contrib import admin

from .models import Aluno, Disciplina, Turma


@admin.register(Turma)
class TurmaAdmin(admin.ModelAdmin):
    list_display = ("nome", "ano_letivo", "sala", "turno")
    search_fields = ("nome", "sala", "turno")


@admin.register(Disciplina)
class DisciplinaAdmin(admin.ModelAdmin):
    list_display = ("nome", "carga_horaria", "ativa")
    list_filter = ("ativa",)
    search_fields = ("nome",)


@admin.register(Aluno)
class AlunoAdmin(admin.ModelAdmin):
    list_display = ("nome", "matricula", "turma", "email", "data_nascimento")
    list_filter = ("turma", "disciplinas")
    search_fields = ("nome", "matricula", "email")
    filter_horizontal = ("disciplinas",)
