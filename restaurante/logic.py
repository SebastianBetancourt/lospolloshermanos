from datetime import date

def calcularPrecioDespuesDeDescuentos(valorbruto, descuentos):
    multiplicador = 1
    # acomula multiplicativamente
    for descuento in descuentos:
        if descuento.valido_desde <= date.today() and descuento.valido_hasta >= date.today():
           multiplicador = multiplicador - (multiplicador * descuento.descuento/100)
    return valorbruto * multiplicador

def sumarIva(valorbruto, iva):
    return valorbruto * (1+iva/100)

