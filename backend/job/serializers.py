from django.core.exceptions import MultipleObjectsReturned
from rest_framework import serializers
from job.models import Job, Skill


class SkillSerializer(serializers.ModelSerializer):
    count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Skill
        fields = ['id', 'name', 'count']


class JobSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, required=False)

    class Meta:
        model = Job
        fields = ['id', 'title', 'description', 'skills']

    def create(self, validated_data):
        try:
            skills_data = validated_data.pop('skills')
        except KeyError:
            skills_data = []
        job = Job.objects.create(**validated_data)

        for skill_data in skills_data:
            try:
                skill, created = Skill.objects.get_or_create(
                    name=skill_data['name'])
            except MultipleObjectsReturned:
                continue
            except KeyError:
                continue

            job.skills.add(skill)

        return job
