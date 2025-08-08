# app/utils.py
import requests
from django.core.files.base import ContentFile


def save_image_from_url(instance, url, field_name="image"):
    """
    Faz o download da imagem da URL e salva no campo ImageField do modelo.
    `instance` é a instância do modelo (ex: CharacterImage)
    `field_name` é o nome do campo ImageField (default 'image')
    """
    response = requests.get(url)
    if response.status_code == 200:
        file_name = url.split("/")[-1].split("?")[0]  # nome básico do arquivo
        getattr(instance, field_name).save(
            file_name, ContentFile(response.content), save=False
        )
        instance.save()
        return True
    return False
