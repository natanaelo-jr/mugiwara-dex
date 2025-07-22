from django.db import models


class DevilFruit(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(
        max_length=50,
        choices=[("P", "Paramecia"), ("Z", "Zoan"), ("L", "Logia")],
    )
    description = models.TextField(blank=True, null=True)
    img_url = models.URLField(blank=True, null=True)
