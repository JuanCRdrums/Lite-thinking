from django.contrib import admin
from .models import Company

# Register your models here.

class CompanyAdmin(admin.ModelAdmin):
    list = ('name','address','nit','phone')

    admin.site.register(Company)