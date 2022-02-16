from django.shortcuts import render
from .models import Company
from .serializers import CompanySerializer
from rest_framework import viewsets

# Create your views here.
class CompanyViewSet(viewsets.ModelViewSet):
    serializer_class = CompanySerializer
    queryset = Company.objects.all()
