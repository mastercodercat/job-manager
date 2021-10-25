from rest_framework.test import APITestCase

from job.models import Job, Skill


class SkillModelTest(APITestCase):
    def create_skill(self, name="Django"):
        return Skill.objects.create(name=name)

    def test_skill_create_with_valid_data_successful(self):
        skill = self.create_skill()

        self.assertIsInstance(skill, Skill)
        self.assertEqual(skill.__str__(), skill.name)
        self.assertEqual(skill.name, 'Django')


class JobModelTest(APITestCase):
    def create_job(self, title="Job title", description="Job description", skills=[]):
        job = Job.objects.create(title=title, description=description)

        for skill in skills:
            skill_object, created = Skill.objects.get_or_create(name=skill)
            job.skills.add(skill_object)

        return job

    def test_create_job_without_skills_successful(self):
        job = self.create_job()

        self.assertIsInstance(job, Job)
        self.assertEqual(job.title, 'Job title')
        self.assertEqual(job.description, 'Job description')
        self.assertEqual(job.skills.count(), 0)

    def test_create_job_with_skills_successful(self):
        job = self.create_job(skills=['Django', 'React'])

        self.assertIsInstance(job, Job)
        self.assertEqual(job.skills.count(), 2)
