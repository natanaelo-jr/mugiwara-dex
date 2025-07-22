from rest_framework import serializers
from api.models.devilfruit import DevilFruit


class DevilFruitSerializer(serializers.ModelSerializer):
    class Meta:
        model = DevilFruit
        fields = "__all__"
