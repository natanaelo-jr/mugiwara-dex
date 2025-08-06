from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from api.models.crew import Crew
from api.serializers.crew import CrewSerializer
from rest_framework import filters


class CrewViewSet(viewsets.ModelViewSet):
    queryset = Crew.objects.all()
    serializer_class = CrewSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]
