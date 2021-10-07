from datetime import date 
from django.test import TestCase
from restaurante.models import Producto, Descuento
from . import logic

class TestCalculoPrecios(TestCase):

    def setUp(self):
        self.dummy_p1 = Producto.objects.create(nombre='test', descripcion='test', precio_unitario=100, iva=17, disponible=True)
        self.dummy_p2 = Producto.objects.create(nombre='test2', descripcion='test', precio_unitario=7680, iva=21, disponible=True)
        self.descuento1 = Descuento.objects.create(producto=self.dummy_p1, descuento=10, valido_desde=date(2021, 6, 1), valido_hasta=date(2021,10,1))
        # descuento vencido en el pasado
        self.descuento2 = Descuento.objects.create(producto=self.dummy_p1, descuento=10, valido_desde=date(2020, 6, 1), valido_hasta=date(2020,10,1))
        # descuento todavia no aplicable, en el futuro
        self.descuento3 = Descuento.objects.create(producto=self.dummy_p1, descuento=10, valido_desde=date(2022, 6, 1), valido_hasta=date(2022,10,1))
        # otro descuento para probar que la acumulacion es multiplicativa y no aditiva 
        self.descuento4 = Descuento.objects.create(producto=self.dummy_p1, descuento=10, valido_desde=date(2021, 6, 15), valido_hasta=date(2021,12,1))

    def test_descuentos(self):
        self.assertEqual(logic.calcularPrecioDespuesDeDescuentos(self.dummy_p1.precio_unitario, []), 100)
        self.assertEqual(logic.calcularPrecioDespuesDeDescuentos(self.dummy_p1.precio_unitario, [self.descuento1]), 90)
        self.assertEqual(logic.calcularPrecioDespuesDeDescuentos(self.dummy_p1.precio_unitario, [self.descuento2]), 100)
        self.assertEqual(logic.calcularPrecioDespuesDeDescuentos(self.dummy_p1.precio_unitario, [self.descuento3]), 100)
        self.assertEqual(logic.calcularPrecioDespuesDeDescuentos(self.dummy_p1.precio_unitario, [self.descuento1, self.descuento2, self.descuento3, self.descuento4]), 81)
        
    def test_iva(self):
        self.assertEqual(logic.sumarIva(self.dummy_p1.precio_unitario, self.dummy_p1.iva), 117)
        self.assertEqual(logic.sumarIva(self.dummy_p2.precio_unitario, self.dummy_p2.iva), 9292.8)