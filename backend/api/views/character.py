from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from api.models.character import Pirate, Marine
from api.serializers.character import PirateSerializer


class PirateViewSet(viewsets.ModelViewSet):
    queryset = Pirate.objects.all()
    serializer_class = PirateSerializer
    permission_classes = [IsAuthenticated]


class MarineViewSet(viewsets.ModelViewSet):
    queryset = Marine.objects.all()
    serializer_class = PirateSerializer
    permission_classes = [IsAuthenticated]
