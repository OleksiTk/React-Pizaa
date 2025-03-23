import * as yup from "yup";

const regExpPassword = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/);
export const shema = yup.object({
  username: yup
    .string()
    .trim()
    .required("Обовзяково для заповнення")
    .min(3, "Треба хоча би 3 букви"),
  password: yup
    .string()
    .required("Обовзяково для заповнення")
    .matches(
      regExpPassword,
      "Треба 6 символів одну цифру і одну велику літеру"
    ),
});
