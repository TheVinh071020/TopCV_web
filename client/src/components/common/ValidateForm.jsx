import React from "react";
import * as Yup from "yup";

function ValidateForm({ initialValues, onSubmit }) {
  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    level: Yup.string().required("Level is required"),
    experience: Yup.string().required("Experience is required"),
    salary: Yup.number()
      .required("Salary is required")
      .positive("Salary must be positive"),
  });

  const handleSubmit = async (values) => {
    try {
      await schema.validate(values, { abortEarly: false });
      onSubmit(values);
    } catch (errors) {
      return errors.errors;
    }
  };

  return null;
}
export default ValidateForm;
