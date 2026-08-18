from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator


class Automovel(models.Model):
    placa = models.CharField(max_length=10, unique=True, blank=False)
    marca = models.CharField(max_length=100)
    modelo = models.CharField(max_length=100)
    ano = models.PositiveIntegerField(
        validators=[
            MinValueValidator(1900),
            MaxValueValidator(timezone.now().year),
    ])
    cor = models.CharField(max_length=50, default="")
    valor_diaria = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        default=0,
    )
    data_cadastro = models.DateField(default=timezone.now)

    def __str__(self):
        return f"{self.placa}, {self.marca}, {self.modelo}"
