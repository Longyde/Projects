from django.contrib import admin
from .models import Post

# Gives Admin rights to Post
admin.site.register(Post)
