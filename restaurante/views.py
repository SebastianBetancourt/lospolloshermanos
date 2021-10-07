from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse
from django.urls.conf import include
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
from django.forms import modelform_factory, modelformset_factory
from django.contrib.auth.models import Group, User
from django.contrib.auth import logout
from cart.cart import Cart
from django.db.models.expressions import OuterRef, Subquery
from django.db.models import IntegerField
def index(request):
    template = loader.get_template('index.html')
    return HttpResponse(template.render({}, request))

def signup(request):
    sedeForm = modelform_factory(models.Usuario, fields=['sede'])
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        sede = sedeForm(request.POST)
        if form.is_valid() and sede.is_valid():
            user = form.save()

            user = authenticate(
                username=form.cleaned_data.get('username'),
                password=form.cleaned_data.get('password1')
            )
            login(request, user)
            return redirect('index')
    else:
        form = UserCreationForm()
        sede = sedeForm()
    return render(request, 'registration/signup.html', {'form': form, 'sede' : sede})

class Perfil(PermissionRequiredMixin, DetailView):
    template_name = 'usuario/perfil.html'
    model = models.Usuario
    
    def get_permission_required(self):
        if int(self.kwargs['pk']) == self.request.user.usuario.id:
            return []
        return ['restaurante.view_usuario']

class Producto(DetailView):
    template_name = 'producto/perfil.html'
    model = models.Producto
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['detalles'] = models.Detalle.objects.filter(producto=self.kwargs['pk'])
        context['existencia'], _ = models.Existencia.objects.get_or_create(producto=models.Producto.objects.get(id=self.kwargs['pk']), sede = self.request.user.usuario.sede,  defaults = {'cantidad': 0})
        return context

    

class Usuarios(PermissionRequiredMixin, ListView):
    template_name = 'usuario/lista.html'
    paginate_by = 10

    def setup(self, request, *args, **kwargs):
        self.model = models.Usuario
        super().setup(request, *args, **kwargs)

    def get_permission_required(self):
        return ['restaurante.view_usuario']
    

class Productos(ListView):
    template_name = 'producto/lista.html'
    paginate_by = 10

    def setup(self, request, *args, **kwargs):
        self.model = models.Producto
        super().setup(request, *args, **kwargs)

    def get_queryset(self):
        print('0')
        cantidadEnSede = models.Existencia.objects.filter(producto=OuterRef('pk'), sede = self.request.user.usuario.sede).values('cantidad')
        productos = models.Producto.objects.annotate(cantidad=Subquery(cantidadEnSede, output_field=IntegerField()))
        return productos
    

@login_required
def borrar(request, objeto, pk):
    suicidio = False
    if objeto == 'usuario':
        model = User
        pk = models.Usuario.objects.get(id=pk).user.id
        suicidio = int(pk) == request.user.id
        redirect = reverse('index')
    elif objeto == 'producto':
        model = models.Producto
        redirect = reverse('productos')
    elif objeto == 'sede':
        model = models.Sede
        redirect = reverse('sedes')

    instancia = model.objects.get(id=pk)
    deleted = instancia.delete()
    if deleted[0] > 0:
        messages.success(request, objeto+" eliminado"+(" (también se borraron "+str(deleted[0]-1)+" registros relacionados)." if deleted[0] > 1 else ""))
        if(suicidio):
            logout(request)
        return HttpResponseRedirect(redirect)

@login_required
def editar_usuario(request, pk):
    model = models.Usuario
    usuario = model.objects.get(id=pk)

    form = modelform_factory(model, exclude=["user"])
    if request.method == 'POST':
        POST = request.POST.copy()
        if hasattr(request.user, 'usuario') and request.user.usuario.rol != models.Usuario.Administrador:
            POST['rol'] = usuario.rol

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

@permission_required('proyecto.add_producto')
def crear_producto(request):
    productoForm = modelform_factory(models.Producto, exclude=())
    detallesFormSet = modelformset_factory(models.Detalle, extra=2, max_num=100, exclude=('producto',), min_num=3, validate_min=True)
    if request.method == 'POST':
        producto = productoForm(request.POST)
        detalles = detallesFormSet(request.POST)
        if producto.is_valid() and detalles.is_valid():
            p = producto.save(commit=False)
            p.save()
            ds = detalles.save(commit=False)
            for d in ds:
                d.producto = p 
                d.save()
            producto.save_m2m()
            messages.success(request, 'Producto '+p.nombre+' añadido exitosamente.')
            return HttpResponseRedirect(reverse('productos'))
    else:
        producto = productoForm()
        detalles = detallesFormSet(queryset=models.Detalle.objects.none())
    return render(request, 'producto/crear.html', {'form': producto, 'common_tags' : models.Producto.categorias.most_common()[:4],'formDetalles' : detalles})

@login_required
def editar_producto(request, pk):
    producto = models.Producto.objects.get(id=pk)
    existenciaEnSede, _ = models.Existencia.objects.get_or_create(producto = producto, sede = request.user.usuario.sede,  defaults = {'cantidad': 0})
    existenciaForm = modelform_factory(models.Existencia, fields=['cantidad'])
    productoForm = modelform_factory(models.Producto, exclude=[])
    detalles =  models.Detalle.objects.filter(producto=producto)
    detallesFormSet = modelformset_factory(models.Detalle, extra=3, max_num=100, exclude=('producto',), min_num=2, validate_min=True)
    if request.method == 'POST':
        p = productoForm(request.POST, instance=producto)
        d = detallesFormSet(request.POST)
        c = existenciaForm(request.POST, instance = existenciaEnSede)
        if p.is_valid() and d.is_valid() and c.is_valid():
            p.save()
            #detalles.delete()
            c.save()
            ds = d.save(commit=False)
            for d in ds:
                d.producto = producto
                d.save()
            messages.success(request, producto.nombre+' editado exitosamente.')
            return HttpResponseRedirect(reverse('producto', args=(pk,)))
    else:
        p = productoForm(instance=producto)
        d = detallesFormSet(queryset=detalles)
        c = existenciaForm(instance=existenciaEnSede)
    return render(request, 'producto/editar.html', {'productoForm': p, 'detallesForm' : d, 'existenciaForm' : c, 'pk' : pk})
    
class Sedes(ListView):
    template_name = 'sede/lista.html'
    paginate_by = 10

    def setup(self, request, *args, **kwargs):
        self.model = models.Sede
        super().setup(request, *args, **kwargs)

@login_required
def editar_sede(request, pk):
    sede = models.Sede.objects.get(id=pk)
    sedeForm = modelform_factory(models.Sede, exclude=[])
    if request.method == 'POST':
        p = sedeForm(request.POST, instance=sede)
        if p.is_valid():
            p.save()
            messages.success(request, sede.nombre+' editado exitosamente.')
            return HttpResponseRedirect(reverse('sede', args=(pk,)))
    else:
        p = sedeForm(instance=sede)
    return render(request, 'sede/editar.html', {'sedeForm': p, 'pk' : pk})

@permission_required('proyecto.add_sede')
def crear_sede(request):
    sedeForm = modelform_factory(models.Sede, exclude=())
    if request.method == 'POST':
        sede = sedeForm(request.POST)
        if sede.is_valid():
            p = sede.save(commit=False)
            p.save()
            messages.success(request, 'Sede '+p.nombre+' añadido exitosamente.')
            return HttpResponseRedirect(reverse('sedes'))
    else:
        sede = sedeForm()
    return render(request, 'sede/crear.html', {'form': sede})


class Sede(DetailView):
    template_name = 'sede/perfil.html'
    model = models.Sede
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context


def adaptar_producto_para_carrito(producto):
    producto.name = producto.nombre
    producto.price = producto.precio_unitario
    producto.image = producto.imagen
    return producto

@login_required
def cart_add(request, id):
    cart = Cart(request)
    product = models.Producto.objects.get(id=id)
    cart.add(product=adaptar_producto_para_carrito(product))
    return redirect("productos")


@login_required
def item_clear(request, id):
    cart = Cart(request)
    product = models.Producto.objects.get(id=id)
    cart.remove(product)
    return redirect("cart_detail")


@login_required
def item_increment(request, id):
    cart = Cart(request)
    product = models.Producto.objects.get(id=id)
    cart.add(product=product)
    return redirect("cart_detail")


@login_required
def item_decrement(request, id):
    cart = Cart(request)
    product = models.Producto.objects.get(id=id)
    cart.decrement(product=product)
    return redirect("cart_detail")


@login_required
def cart_clear(request):
    cart = Cart(request)
    cart.clear()
    return redirect("cart_detail")


@login_required
def cart_detail(request):
    return render(request, 'cart/cart_detail.html')
