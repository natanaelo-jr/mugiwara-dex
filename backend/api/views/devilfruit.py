from rest_framework import viewsets
from api.models.devilfruit import DevilFruit
from api.serializers.devilfruit import DevilFruitSerializer
from rest_framework import filters


class DevilFruitViewSet(viewsets.ModelViewSet):
    queryset = DevilFruit.objects.all()
    serializer_class = DevilFruitSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name"]
    ordering_fields = ["name", "type"]
    ordering = ["name"]
