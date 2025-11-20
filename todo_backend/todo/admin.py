from django.contrib import admin
from .models import Task, Column


# Register your models here.
class ColumnAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'created_at']
    list_editable = ['order']


class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'column', 'completed', 'created_at']
    list_filter = ['column', 'completed']


admin.site.register(Column, ColumnAdmin)
admin.site.register(Task, TaskAdmin)