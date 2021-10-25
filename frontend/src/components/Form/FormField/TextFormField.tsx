import React from "react";
import { FieldProps, getIn } from "formik";
import TextField from "@mui/material/TextField";

const TextFormField: React.FC<FieldProps> = ({ field, form, ...props }) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <TextField
      fullWidth
      margin="normal"
      helperText={errorText}
      error={!!errorText}
      {...field}
      {...props}
    />
  );
};

export default TextFormField;
