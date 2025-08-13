from rest_framework import viewsets
from api.models.character import Pirate, Marine
from api.serializers.character import (
    PirateSerializer,
    MarineSerializer,
    CharacterUnionSerializer,
)
from rest_framework.generics import ListAPIView
from rest_framework import filters


class PirateViewSet(viewsets.ModelViewSet):
    queryset = Pirate.objects.all()
    serializer_class = PirateSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name"]
    ordering_fields = ["name", "bounty"]
    ordering = ["name"]


class MarineViewSet(viewsets.ModelViewSet):
    queryset = Marine.objects.all()
    serializer_class = MarineSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "rank"]
    ordering_fields = ["name", "rank"]
    ordering = ["name"]


class CharacterListView(ListAPIView):
    serializer_class = CharacterUnionSerializer
    search_fields = ["name"]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ["name"]
    ordering = ["name"]

    def get_queryset(self):
        pirates = list(Pirate.objects.all())
        marines = list(Marine.objects.all())
        for pirate in pirates:
            pirate.type = "pirate"
        for marine in marines:
            marine.type = "marine"
        return pirates + marines

    def filter_queryset(self, queryset):
        request = self.request
        params = request.query_params

        search = params.get("search", "").lower()
        type_filter = params.get("type")
        obs_haki = params.get("observation_haki")
        arm_haki = params.get("armament_haki")
        conq_haki = params.get("conqueror_haki")
        ordering = params.get("ordering", "name")  # padrão "name"

        def to_bool(val):
            return val.lower() in ["true", "1", "yes"] if val else None

        obs_haki = to_bool(obs_haki)
        arm_haki = to_bool(arm_haki)
        conq_haki = to_bool(conq_haki)

        filtered = []
        for obj in queryset:
            if search and search not in obj.name.lower():
                continue
            if type_filter and obj.type != type_filter:
                continue
            if obs_haki is not None and obj.observation_haki != obs_haki:
                continue
            if arm_haki is not None and obj.armament_haki != arm_haki:
                continue
            if conq_haki is not None and obj.conqueror_haki != conq_haki:
                continue
            filtered.append(obj)

        ordering_param = ordering.lstrip("-")
        reverse = ordering.startswith("-")
        filtered.sort(key=lambda x: getattr(x, ordering_param) or "", reverse=reverse)

        return filtered
