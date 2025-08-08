from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views.character import MarineViewSet, PirateViewSet, CharacterListView
from api.views.crew import CrewViewSet
from api.views.devilfruit import DevilFruitViewSet
from api.views.image import ImageUploadAPIView, ImageViewSet

router = DefaultRouter()
router.register(r"pirates", PirateViewSet)
router.register(r"marines", MarineViewSet)
router.register(r"devilfruits", DevilFruitViewSet)
router.register(r"crews", CrewViewSet)
router.register(r"images", ImageViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("characters/", CharacterListView.as_view(), name="character-list"),
    path("images/upload/", ImageUploadAPIView.as_view(), name="image-upload"),
]
