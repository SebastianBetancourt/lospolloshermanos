from django.db import models
from django.contrib.auth.models import User
from taggit.managers import TaggableManager

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

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio_unitario = models.IntegerField()
    categorias = TaggableManager()
    iva = models.IntegerField()
    disponible = models.BooleanField()

class Detalle(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    detalle =  models.TextField()