from rest_framework import serializers
from job.models import Job, Skill


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name']


class JobSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, required=False)

    class Meta:
        model = Job
        fields = ['id', 'title', 'description', 'skills']

    def create(self, validated_data):
        skills_data = validated_data.pop('skills')
        job = Job.objects.create(**validated_data)

        for skill_data in skills_data:
            if not skill_data['name']:
                continue
            skill, created = Skill.objects.get_or_create(
                name=skill_data['name'])
            job.skills.add(skill)

        return job
