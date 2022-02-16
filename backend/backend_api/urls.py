from backend_api.views import CompanyViewSet
from rest_framework.routers import DefaultRouter
from backend_api import views

router = DefaultRouter()
router.register(r'companies', views.CompanyViewSet, basename='company')
urlpatterns = router.urls