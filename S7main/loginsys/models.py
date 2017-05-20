from django.db import models

# Create your models here.

class Style(models.Model):
    class Meta():
        db_table = "style"

    style_type = models.CharField(max_length = 200) #типы отдыха
    style_group = models.CharField(max_length = 200) #с кем отдых
    #article_date = models.DateTimeField() #дата и время
    style_capacity = models.IntegerField(default=0) # сколько раз в год летаете

class  Users (models.Model):
    class Meta():
        db_table = "users"

    user_name = models.CharField(max_length = 200) #типы отдыха
    user_phone = models.CharField(max_length = 200) #с кем отдых
    man_ = models.IntegerField(default=0) # сколько раз в год летаете