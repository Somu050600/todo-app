from rest_framework import serializers
from .models import Task, Column


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


class ColumnSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    task_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Column
        fields = ['id', 'title', 'order', 'created_at', 'tasks', 'task_count']
    
    def get_task_count(self, obj):
        return obj.tasks.count()
