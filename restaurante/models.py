from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Usuario(models.Model): 
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    Administrador = 'Administrador'
    Funcionario = 'Funcionario'
    Cliente = 'Cliente'
    ROL_CHOICES = [
        (Administrador, 'Administrador'),
        (Funcionario, 'Funcionario'),
        (Cliente, 'Cliente')
    ]
    rol = models.CharField(max_length=20, choices=ROL_CHOICES)

# Un Objeto puede ser Cliente, Sede, Producto, Usuario