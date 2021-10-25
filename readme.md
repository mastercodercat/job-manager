# Harness Test Job Manager

Offer users the ability to post and manage their jobs for their startups.

## How to run

- In backend, please run these commands.

```
py manage.py makemigrations
py manage.py migrate
py manage.py runserver
```

To test backend api endpoints,

```
py manage.py test
```

- In frontend, please run these commands.

```
npm install
npm start
```

or to build product, run this.

```
npm run build
```

To run unit tests,

```
npm run test
```

To run e2e tests,

```
npm run e2e
```

## Application Architecture

- Backend(Django)
- Frontend(React, Reduxjs toolkit, Material UI, Formik, Cypress)

## Backend - Django

### Dependencies version

- Python 3.10
- Django 3.2.6

### REST endpoints

- `GET /api/jobs/`: list job information
- `GET /api/jobs/:id/`: get job details
- `GET /api/top-skills/`: get the most used skills in the posted jobs
- `POST /api/jobs/`: create a job

### Admin

- `/admin`: able to see and edit information using django admin

### Tests

- `test.models` to test models and database
- `test.serializers` to test serializers
- `test.views` to test endpoints

## Frontend - React

### Dependencies

- React
- TypeScript
- Redux(redux-toolkit)
- Material UI
- Formik
- Cypress
- @testing-library/react

### Components

- `JobForm` to implement form to create a job
- `JobBoard` to show job list
- `JobDetail` to show job detail
- `TopSkills` to show most used skills
