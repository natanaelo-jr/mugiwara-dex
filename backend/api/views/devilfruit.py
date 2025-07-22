from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from api.models.devilfruit import DevilFruit
from api.serializers.devilfruit import DevilFruitSerializer


class DevilFruitViewSet(viewsets.ModelViewSet):
    queryset = DevilFruit.objects.all()
    serializer_class = DevilFruitSerializer
    permission_classes = [IsAuthenticated]
