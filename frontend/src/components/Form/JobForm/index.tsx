import React from "react";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";

import { Job } from "../../../redux/modules/job/types";

import AppCard from "../../AppCard";
import TextFormField from "../FormField/TextFormField";

// define type
type FormikSetActionType = (
  field: string,
  value: any,
  shouldValidate?: boolean
) => void;

interface JobFormProps {
  onAdd: (job: Job) => void;
}

// define validation schema
const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
});

// define initial values
const initialValues = { title: "", description: "", skill: "" };

const JobForm = ({ onAdd }: JobFormProps) => {
  const [skills, setSkills] = React.useState<string[]>([]);

  const onAddSkill = (skill: string, setFieldValue: FormikSetActionType) => {
    if (skill !== "") {
      setSkills([...skills, skill]);
      setFieldValue("skill", "");
    }
  };

  return (
    <AppCard title="Post a Job">
      <Formik
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          onAdd({
            title: values.title,
            description: values.description,
            skills: skills.map((skill) => ({ name: skill })),
          });
          setSkills([]);
          actions.resetForm({ values: initialValues });
        }}
      >
        {({ values, setFieldValue }) => (
          <Form data-testid="job-form">
            <Field label="Title" name="title" component={TextFormField} />
            {skills.map((skill, index) => (
              <Typography variant="subtitle1" key={index} role="job-skill">
                {skill}
              </Typography>
            ))}
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Field
                  label={`Skill ${skills.length + 1}`}
                  name="skill"
                  component={TextFormField}
                />
              </Grid>
              <Grid item xs={4} style={{ display: "flex" }}>
                <IconButton
                  id="add_skill"
                  color="secondary"
                  onClick={() => onAddSkill(values.skill, setFieldValue)}
                >
                  <AddIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Field
              label="Description"
              name="description"
              multiline
              rows={4}
              component={TextFormField}
            />
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Form>
        )}
      </Formik>
    </AppCard>
  );
};

export default JobForm;
