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
