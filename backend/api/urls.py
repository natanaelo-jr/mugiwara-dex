from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views.character import MarineViewSet, PirateViewSet
from api.views.crew import CrewViewSet
from api.views.devilfruit import DevilFruitViewSet

router = DefaultRouter()
router.register(r"pirates", PirateViewSet)
router.register(r"marines", MarineViewSet)
router.register(r"devilfruits", DevilFruitViewSet)
router.register(r"crews", CrewViewSet)

urlpatterns = [path("", include(router.urls))]
