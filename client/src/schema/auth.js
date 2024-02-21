import * as yup from 'yup'

export const registerSchema = yup.object().shape({
  name: yup.string().required().min(2, "Name minimum 2 characters"),
  email: yup.string().email("Invalid email").required(),
  password: yup.string().min(6, "Password minimum 2 characters")
})
