import * as yup from "yup";
const regExpEmail = new RegExp(/^\S+@\S+\.\S+$/);
const regExpPassword = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/);
export const shema = yup.object({
  username: yup
    .string()
    .trim()
    .required("Обовзяково для заповнення")
    .min(3, "Треба хоча би 3 букви"),
  email: yup
    .string()
    .required("Обовзяково для заповнення")
    .matches(regExpEmail, "Непраивльний формат пошти"),
  password: yup
    .string()
    .required("Обовзяково для заповнення")
    .matches(
      regExpPassword,
      "Треба 6 символів одну цифру і одну велику літеру"
    ),
  enterypassword: yup
    .string()
    .required("Обов'язково для заповнення")
    .oneOf([yup.ref("password")], "Паролі не співпадають")
    .matches(
      regExpPassword,
      "Треба 6 символів, одну цифру і одну велику літеру"
    ),
});
