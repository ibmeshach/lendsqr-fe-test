import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter any valid email address")
    .required("Enter any email address"),

  password: yup.string().required("Enter any password"),
});
