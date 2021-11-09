import * as yup from "yup";

const phoneRegExp = /^[0-9]{10}$/;
const addUserSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "Firstname too Short!")
    .max(50, "Firstname too Long!")
    .required("Firstname required"),
  lastName: yup
    .string()
    .min(2, "Lastname too Short!")
    .max(50, "Lastname too Long!")
    .required("Lastname required"),
  email: yup.string().email("Invalid email").required("Email required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("phone number required"),
  tenant: yup.string().ensure().required("Customer is required"),
  role: yup.string().ensure().required("required role")
});

export default addUserSchema;
