from django.db import models


class Image(models.Model):
    TYPES = [
        ("portrait", "Portrait"),
        ("character", "Character"),
        ("fruit", "Fruit"),
        ("crew", "Crew"),
    ]

    name = models.CharField(max_length=100)  # nome do personagem ou algo assim
    image = models.ImageField(upload_to="character_images/")
    type = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True, choices=TYPES)

    def __str__(self):
        return self.name
