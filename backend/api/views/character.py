from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from api.models.character import Pirate, Marine
from api.serializers.character import (
    PirateSerializer,
    MarineSerializer,
    CharacterUnionSerializer,
)
from rest_framework.response import Response


class PirateViewSet(viewsets.ModelViewSet):
    queryset = Pirate.objects.all()
    serializer_class = PirateSerializer


class MarineViewSet(viewsets.ModelViewSet):
    queryset = Marine.objects.all()
    serializer_class = MarineSerializer


class CharacterViewSet(viewsets.ViewSet):
    serializer_class = CharacterUnionSerializer

    def list(self, request):

        pirates = list(Pirate.objects.all())
        marines = list(Marine.objects.all())

        for pirate in pirates:
            pirate.type = "pirate"

        for marine in marines:
            marine.type = "marine"

        all_characters = pirates + marines
        serializer = self.serializer_class(all_characters, many=True)
        return Response(serializer.data)
