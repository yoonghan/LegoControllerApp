import * as Yup from "yup";
import { translate } from "./tools";

const LoginRegisterSchemaShape = {
  email: Yup.string()
    .email(translate("Invalid email address"))
    .required(translate("Required")),
  password: Yup.string()
    .min(6, translate("Too short"))
    .max(12, translate("Too long"))
    .required(translate("Required")),
};

export const LoginSchema = Yup.object().shape(LoginRegisterSchemaShape);

export const RegisterSchema = Yup.object().shape({
  ...LoginRegisterSchemaShape,
  retypePassword: Yup.string()
    .oneOf([Yup.ref("password"), null], translate("Passwords must match"))
    .required(translate("Required"))
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email(translate("Invalid email address"))
    .required(translate("Required"))
});

export const ApplicationSchema = Yup.object().shape({
  first_name: Yup.string(),
  last_name: Yup.string(),
  mobileno: Yup.number(),
  address: Yup.string(),
  postal_code: Yup.number(),
  company_name: Yup.string(),
  email: Yup.string()
    .email(translate("Invalid email address"))
    .required(translate("Required"))
});
