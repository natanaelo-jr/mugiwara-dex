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


class CharacterUnionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    age = serializers.IntegerField()
    observation_haki = serializers.BooleanField()
    armament_haki = serializers.BooleanField()
    conqueror_haki = serializers.BooleanField()
    img_url = serializers.URLField(allow_null=True)
    portrait_url = serializers.URLField(allow_null=True)
    type = serializers.SerializerMethodField()

    def get_type(self, obj):
        if hasattr(obj, "bounty"):
            return "pirate"
        elif hasattr(obj, "position"):
            return "marine"
        return "unknown"
