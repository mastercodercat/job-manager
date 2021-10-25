from rest_framework.exceptions import ErrorDetail
from rest_framework.test import APITestCase

from job.serializers import JobSerializer


class JobSerializerTest(APITestCase):
    def setUp(self):
        self.Serializer = JobSerializer

    def create_job(self, title='Job title', description='Job description', skills=[]):
        return {
            'title': title,
            'description': description,
            'skills': skills
        }

    def test_valid_serializer_with_skills(self):
        data = self.create_job(skills=[{'name': 'django'}, {'name': 'react'}])
        serializer = self.Serializer(data=data)

        self.assertTrue(serializer.is_valid())
        self.assertDictEqual(serializer.validated_data, data)
        self.assertDictEqual(serializer.data, data)
        self.assertDictEqual(serializer.errors, {})

    def test_valid_serializer_without_skills(self):
        data = self.create_job()
        serializer = self.Serializer(data=data)

        self.assertTrue(serializer.is_valid())
        self.assertDictEqual(serializer.validated_data, data)
        self.assertDictEqual(serializer.data, data)
        self.assertDictEqual(serializer.errors, {})

    def test_invalid_serializer_without_field(self):
        serializer = self.Serializer(data={})

        self.assertFalse(serializer.is_valid())
        self.assertDictEqual(serializer.errors, {
            'title': [
                ErrorDetail(string='This field is required.', code='required')
            ],
            'description': [
                ErrorDetail(string='This field is required.', code='required')
            ],
        })

    def test_invalid_serializer_with_blank_field(self):
        serializer = self.Serializer(
            data=self.create_job(title='', description=''))

        self.assertFalse(serializer.is_valid())
        self.assertDictEqual(serializer.errors, {
            'title': [
                ErrorDetail(
                    string='This field may not be blank.', code='blank')
            ],
            'description': [
                ErrorDetail(
                    string='This field may not be blank.', code='blank')
            ],
        })

    def test_invalid_serializer_with_invalid_skills(self):
        data = self.create_job(skills=['django', 'react'])
        serializer = self.Serializer(data=data)

        self.assertFalse(serializer.is_valid())

    def test_invalid_datatype(self):
        serializer = self.Serializer(
            data=[self.create_job(title=123, description=123)])

        self.assertFalse(serializer.is_valid())
        self.assertDictEqual(serializer.errors, {
            'non_field_errors': [
                ErrorDetail(
                    string='Invalid data. Expected a dictionary, but got list.', code='invalid')
            ],
        })

    def test_empty_serializer(self):
        serializer = self.Serializer()

        self.assertDictEqual(serializer.data, {
            'title': '',
            'description': '',
            'skills': []
        })
