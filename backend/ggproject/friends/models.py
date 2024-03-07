from django.db import models
from django.contrib.auth.models import User


class Friends(models.Model):
    # Existing fields
    user1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user1_friends')
    user2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user2_friends')
    
    # New status field with choices
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
    )
    status = models.CharField(max_length=8, choices=STATUS_CHOICES, default='pending')
    
    # Timestamps
    request_sent_at = models.DateTimeField(auto_now_add=True)
    request_accepted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user1} and {self.user2} - {self.status}"
