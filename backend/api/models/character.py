from django.db import models


class Character(models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    devil_fruit = models.CharField(max_length=100, blank=True, null=True)
    observation_haki = models.BooleanField(default=False)
    armament_haki = models.BooleanField(default=False)
    conqueror_haki = models.BooleanField(default=False)

    img_url = models.URLField(blank=True, null=True)

    class Meta:
        abstract = True


class Pirate(Character):
    bounty = models.PositiveIntegerField()
    crew = models.ForeignKey(
        "api.Crew", on_delete=models.CASCADE, related_name="pirates", null=True
    )


class Marine(Character):
    POSITION_CHOICES = [
        ("Admiral", "Almirante"),
        ("Vice Admiral", "Vice-Almirante"),
        ("Rear Admiral", "Contra-Almirante"),
        ("Captain", "Capitão"),
        ("Lieutenant", "Tenente"),
        ("Marine", "Soldado"),
    ]
    position = models.CharField(max_length=100, choices=POSITION_CHOICES)
