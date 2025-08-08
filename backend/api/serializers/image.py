from rest_framework import serializers
from api.models.image import Image


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ["id", "name", "image", "type", "created_at"]
