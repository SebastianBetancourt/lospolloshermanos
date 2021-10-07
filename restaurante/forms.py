from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from restaurante.models import Usuario, Sede

class UserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ("first_name", "last_name", "username", "email", "password1", "password2")

    def save(self, commit=True):
        user = super(UserCreationForm, self).save(commit=False)
        user.email = self.cleaned_data["email"]
        user.first_name = self.cleaned_data["first_name"]
        user.last_name = self.cleaned_data["last_name"]
        usuario = Usuario(user=user, rol=Usuario.Cliente, sede = Sede.objects.get(id=self.data['sede']))
        
        if commit:
            user.save()
            usuario.save()
        return user

class UserUpdateForm(forms.ModelForm):
    first_name = forms.CharField(max_length=30)
    last_name = forms.CharField(max_length=30)
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']