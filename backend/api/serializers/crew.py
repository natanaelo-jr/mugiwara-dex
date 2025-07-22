from rest_framework import serializers
from api.models.crew import Crew


class CrewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crew
        fields = "__all__"
