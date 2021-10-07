from django.urls import path
from django.conf.urls import include
from django.contrib import admin
from django.contrib.auth import views as auth_views

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('perfil/<pk>', views.Perfil.as_view(), name='perfil'),
    path('login/', auth_views.LoginView.as_view(), name='login'),
    path('signup/', views.signup, name='signup'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('borrar/<objeto>/<pk>', views.borrar, name='borrar'), 
    path('usuarios/', views.Usuarios.as_view(), name='usuarios'), 
    path('usuario/editar/<pk>', views.editar_usuario, name='usuario_editar'), 
    path('productos/', views.Productos.as_view(), name='productos'), 
    path('producto/editar/<pk>', views.editar_producto, name='producto_editar'), 
    path('producto/crear', views.crear_producto, name='producto_crear'), 
    path('producto/<pk>', views.Producto.as_view(), name='producto'), 
    path('sedes/', views.Sedes.as_view(), name='sedes'), 
    path('sede/editar/<pk>', views.editar_sede, name='sede_editar'), 
    path('sede/crear', views.crear_sede, name='sede_crear'), 
    path('sede/<pk>', views.Sede.as_view(), name='sede'), 
   
]