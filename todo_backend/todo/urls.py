from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    
    # Column endpoints
    path('columns/', views.columnList, name="column-list"),
    path('column-create/', views.columnCreate, name="column-create"),
    path('column-update/<str:pk>/', views.columnUpdate, name="column-update"),
    path('column-delete/<str:pk>/', views.columnDelete, name="column-delete"),
    
    # Task endpoints
    path('task-create/', views.taskCreate, name="task-create"),
    path('task-update/<str:pk>/', views.taskUpdate, name="task-update"),
    path('task-delete/<str:pk>/', views.taskDelete, name="task-delete"),
]
