from django.db import models


class Crew(models.Model):
    name = models.CharField(max_length=100)
    captain = models.ForeignKey(
        "api.Pirate", on_delete=models.CASCADE, related_name="crew_captain", null=True
    )
    ship = models.CharField(max_length=100, blank=True, null=True)
    img_url = models.URLField(blank=True, null=True)
