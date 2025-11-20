from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Task, Column
from .serializers import TaskSerializer, ColumnSerializer


# Create your views here.
@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Columns List': '/columns/',
        'Column Detail': '/column/<str:pk>/',
        'Column Create': '/column-create/',
        'Column Update': '/column-update/<str:pk>/',
        'Column Delete': '/column-delete/<str:pk>/',
        'Task Create': '/task-create/',
        'Task Update': '/task-update/<str:pk>/',
        'Task Delete': '/task-delete/<str:pk>/',
    }
    return Response(api_urls)


# Column Views
@api_view(['GET'])
def columnList(request):
    columns = Column.objects.all()
    serializer = ColumnSerializer(columns, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def columnCreate(request):
    serializer = ColumnSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'PATCH'])
def columnUpdate(request, pk):
    try:
        column = Column.objects.get(id=pk)
    except Column.DoesNotExist:
        return Response({'error': 'Column not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ColumnSerializer(instance=column, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def columnDelete(request, pk):
    try:
        column = Column.objects.get(id=pk)
        column.delete()
        return Response({'message': 'Column successfully deleted!'}, status=status.HTTP_204_NO_CONTENT)
    except Column.DoesNotExist:
        return Response({'error': 'Column not found'}, status=status.HTTP_404_NOT_FOUND)


# Task Views
@api_view(['POST'])
def taskCreate(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'PATCH', 'POST'])
def taskUpdate(request, pk):
    try:
        task = Task.objects.get(id=pk)
    except Task.DoesNotExist:
        return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = TaskSerializer(instance=task, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def taskDelete(request, pk):
    try:
        task = Task.objects.get(id=pk)
        task.delete()
        return Response({'message': 'Task successfully deleted!'}, status=status.HTTP_204_NO_CONTENT)
    except Task.DoesNotExist:
        return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)
