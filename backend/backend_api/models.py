from django.db import models

# Create your models here.
class Company(models.Model):
    name = models.CharField(max_length=250)
    address = models.CharField(max_length=250)
    nit = models.CharField(max_length=20)
    phone = models.CharField(max_length=20)

    def __str__(self) -> str:
        return self.name