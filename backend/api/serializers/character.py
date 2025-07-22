from rest_framework import serializers
from api.models.character import Pirate, Marine


class PirateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pirate
        fields = "__all__"


class MarineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marine
        fields = "__all__"
