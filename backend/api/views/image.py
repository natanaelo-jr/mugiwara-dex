import requests
from django.core.files.base import ContentFile
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from api.models.image import Image
from api.serializers.image import ImageSerializer


class ImageUploadAPIView(APIView):
    def post(self, request):
        name = request.data.get("name")
        type_ = request.data.get("type")
        image_file = request.FILES.get("image")
        image_url = request.data.get("image_url")

        if not name or not type_:
            return Response(
                {"error": "name e type são obrigatórios"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        image_instance = Image(name=name, type=type_)

        if image_file:
            image_instance.image = image_file
            image_instance.save()
        elif image_url:
            try:
                resp = requests.get(image_url)
                resp.raise_for_status()
            except Exception:
                return Response(
                    {"error": "Não foi possível baixar a imagem"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            file_name = name.replace(" ", "-").append(".png")
            image_instance.image.save(file_name, ContentFile(resp.content), save=True)
        else:
            return Response(
                {"error": "Envie um arquivo ou image_url"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = ImageSerializer(image_instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
