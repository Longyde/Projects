from django.shortcuts import render
from .models import Product


# main product page
def index(request):
    products = Product.objects.all()
    return render(request, 'products/products.html', {'products': products})

