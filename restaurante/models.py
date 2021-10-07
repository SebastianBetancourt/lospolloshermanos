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
    
    def __str__(self):
        return '{} ({})'.format(self.user, self.rol)

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio_unitario = models.IntegerField()
    categorias = TaggableManager()
    iva = models.IntegerField()
    disponible = models.BooleanField()
    def __str__(self):
        return '{}'.format(self.nombre)

class Descuento(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    descuento = models.IntegerField()
    valido_desde = models.DateField()
    valido_hasta = models.DateField()
    
class Detalle(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    detalle =  models.TextField()

class Cliente(models.Model):
    identificacion = models.CharField(max_length=100)
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=100)
    fecha_nacimiento = models.DateField()
    direccion = models.CharField(max_length=255)
    def __str__(self):
        return '{}'.format(self.nombre)

class Sede(models.Model):
    nombre = models.CharField(max_length=100) 
    nit = models.CharField(max_length=255)
    direccion = models.CharField(max_length=255)
    telefono = models.CharField(max_length=100)
    def __str__(self):
        return '{}'.format(self.nombre)

class Venta(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    sede = models.ForeignKey(Sede, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)

class Item_venta(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE)
    cantidad = models.IntegerField() 


