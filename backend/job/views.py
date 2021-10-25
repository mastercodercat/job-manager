from django.db.models import Count
from rest_framework import viewsets, mixins

from job.models import Job, Skill
from job.serializers import JobSerializer, SkillSerializer


class JobViewSet(mixins.CreateModelMixin,
                 mixins.ListModelMixin,
                 mixins.RetrieveModelMixin,
                 viewsets.GenericViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer


class SkillViewSet(mixins.ListModelMixin,
                   viewsets.GenericViewSet):
    queryset = Skill.objects.annotate(
        count=Count('job')).order_by('-count')[:5]
    serializer_class = SkillSerializer
