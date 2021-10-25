from django.urls import reverse
from rest_framework.exceptions import ErrorDetail
from rest_framework.test import APITestCase

from job.models import Job, Skill


class JobViewTest(APITestCase):
    def setUp(self):
        self.url = reverse('jobs:job-list')
        self.detail_url = 'jobs:job-detail'

        self.job = self.create_job(skills=[
            {'name': 'drf'},
            {'name': 'redux'}
        ])

    def create_job(self, title="Job title", description="Job description", skills=[]):
        job = Job.objects.create(title=title, description=description)

        for skill in skills:
            skill_object, created = Skill.objects.get_or_create(name=skill)
            job.skills.add(skill_object)

        return job

    def test_create_job_successful(self):
        job = {
            'title': 'Job title',
            'description': 'Job description',
            'skills': [
                {'name': 'django'},
                {'name': 'react'}
            ]
        }

        response = self.client.post(self.url, job, format='json')

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['title'], job['title'])
        self.assertEqual(response.data['description'], job['description'])
        self.assertEqual(len(response.data['skills']), len(job['skills']))

    def test_create_job_failure_with_blank_fields(self):
        job = {
            'title': '',
            'description': '',
        }

        response = self.client.post(self.url, job, format='json')

        self.assertEqual(response.status_code, 400)
        self.assertDictEqual(response.data, {
            'title': [
                ErrorDetail(
                    string='This field may not be blank.', code='blank')
            ],
            'description': [
                ErrorDetail(
                    string='This field may not be blank.', code='blank')
            ]
        })

    def test_create_job_failure_without_fields(self):
        response = self.client.post(self.url, {}, format='json')

        self.assertEqual(response.status_code, 400)
        self.assertDictEqual(response.data, {
            'title': [
                ErrorDetail(string='This field is required.', code='required')
            ],
            'description': [
                ErrorDetail(string='This field is required.', code='required')
            ]
        })

    def test_list_jobs(self):
        jobs_count = Job.objects.count()

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), jobs_count)

    def test_detail_job(self):
        response = self.client.get(
            reverse(self.detail_url, args=[self.job.id]))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['title'], self.job.title)
        self.assertEqual(response.data['description'], self.job.description)
        self.assertEqual(len(response.data['skills']), self.job.skills.count())
