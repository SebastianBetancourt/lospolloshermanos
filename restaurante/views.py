from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.contrib.auth.mixins import PermissionRequiredMixin
from django.contrib.auth.decorators import login_required
from restaurante.forms import UserCreationForm, UserUpdateForm
from django.contrib.auth import update_session_auth_hash, login, authenticate
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required, permission_required
import restaurante.models as models
from django.http import HttpResponseRedirect
from django.contrib import messages
from django.urls import reverse
from django.forms import modelform_factory
from django.contrib.auth.models import Group, User
from django.contrib.auth import logout


def index(request):
    template = loader.get_template('index.html')
    return HttpResponse(template.render({}, request))

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            user = authenticate(
                username=form.cleaned_data.get('username'),
                password=form.cleaned_data.get('password1')
            )
            login(request, user)
            return redirect('index')
    else:
        form = UserCreationForm()
    return render(request, 'registration/signup.html', {'form': form})

class Perfil(PermissionRequiredMixin, DetailView):
    template_name = 'usuario/perfil.html'
    model = models.Usuario
    
    def get_permission_required(self):
        print(int(self.kwargs['pk']))
        print(self.request.user.usuario.id)
        if int(self.kwargs['pk']) == self.request.user.usuario.id:
            return []
        return ['restaurante.view_usuario']

class Usuarios(PermissionRequiredMixin, ListView):
    template_name = 'usuario/lista.html'
    paginate_by = 10

    def setup(self, request, *args, **kwargs):
        self.model = models.Usuario
        super().setup(request, *args, **kwargs)

    def get_permission_required(self):
        return ['restaurante.view_usuario']

@login_required
def borrar(request, objeto, pk):
    if objeto == 'usuario':
        model = User
        pk = models.Usuario.objects.get(id=pk).user.id
        suicidio = int(pk) == request.user.id
        

    instancia = model.objects.get(id=pk)
    deleted = instancia.delete()
    if deleted[0] > 0:
        messages.success(request, objeto+" eliminado"+(" (también se borraron "+str(deleted[0]-1)+" registros relacionados)." if deleted[0] > 1 else ""))
        if(suicidio):
            logout(request)
        return HttpResponseRedirect(reverse('index'))

@login_required
def editar_usuario(request, pk):
    model = models.Usuario
    usuario = model.objects.get(id=pk)

    form = modelform_factory(model, exclude=["user"])
    if request.method == 'POST':
        POST = request.POST.copy()
        if hasattr(request.user, 'usuario') and request.user.usuario.rol != models.Usuario.Administrador:
            POST['rol'] = usuario.rol
            print(POST['rol'])
        usuarioForm = form(POST, instance=usuario)
        userForm = UserUpdateForm(request.POST, instance=usuario.user)
        if usuarioForm.is_valid() and userForm.is_valid():

            usuarioForm.save()
            userForm.save()
            # change permission group
            usuario.user.groups.clear()
            
            usuario.user.groups.add(Group.objects.get(name=usuario.rol))
            
            messages.success(request, usuario.user.username+' editado exitosamente.')
            return HttpResponseRedirect(reverse('perfil', args=(pk,)))
    else:
        userForm = UserUpdateForm(instance= usuario.user)
        usuarioForm = form(instance=usuario)
        if hasattr(request.user, 'usuario') and request.user.usuario.rol != models.Usuario.Administrador:
            usuarioForm.fields['rol'].initial = usuario.rol
            usuarioForm.fields['rol'].disabled = True
            

    return render(request, 'usuario/editar.html', {'usuarioForm': usuarioForm, 'userForm' : userForm,'usuario' : usuario})