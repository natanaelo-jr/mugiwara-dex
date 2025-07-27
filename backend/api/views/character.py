from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from api.models.character import Pirate, Marine
from api.serializers.character import (
    PirateSerializer,
    MarineSerializer,
    CharacterUnionSerializer,
)
from rest_framework.response import Response
from rest_framework.generics import ListAPIView


class PirateViewSet(viewsets.ModelViewSet):
    queryset = Pirate.objects.all()
    serializer_class = PirateSerializer


class MarineViewSet(viewsets.ModelViewSet):
    queryset = Marine.objects.all()
    serializer_class = MarineSerializer


class CharacterListView(ListAPIView):
    serializer_class = CharacterUnionSerializer

    def get_queryset(self):
        pirates = list(Pirate.objects.all())
        marines = list(Marine.objects.all())
        for pirate in pirates:
            pirate.type = "pirate"
        for marine in marines:
            marine.type = "marine"
        return pirates + marines
