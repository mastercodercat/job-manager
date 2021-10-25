from django.urls import path, include
from rest_framework import routers

from job.views import JobViewSet

router = routers.DefaultRouter()
router.register(r'jobs', JobViewSet)

app_name = 'jobs'

urlpatterns = [
    path('', include(router.urls)),
]
