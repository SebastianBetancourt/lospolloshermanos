from django import template
import restaurante.models as models

register = template.Library()

@register.filter(name='is_administrador')
def is_administrador(user):
    return user.groups.filter(name=models.Usuario.Administrador).exists()

@register.filter(name='is_funcionario')
def is_funcionario(user):
    return user.groups.filter(name=models.Usuario.Funcionario).exists()

@register.filter(name='is_cliente')
def is_cliente(user):
    return user.groups.filter(name=models.Usuario.Cliente).exists()