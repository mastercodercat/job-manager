from django.urls import path, include
from rest_framework import routers

from job.views import JobViewSet, SkillViewSet

router = routers.DefaultRouter()
router.register(r'jobs', JobViewSet)
router.register(r'top-skills', SkillViewSet)

app_name = 'jobs'

urlpatterns = [
    path('', include(router.urls)),
]
