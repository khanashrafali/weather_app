import * as yup from "yup";

export const signupSchema = yup.object({
  username: yup.string().required("Please enter your username"),
  email: yup.string().email().required("Please enter your email"),
  password: yup
    .string()
    .required("Please enter a password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[|)(@\<{}>[\]/$!%*?:;.,=&_#~"'`^+-])[A-Za-z\d|)(@\<{}>[\]/$!%*?:;.,=&_#~"'`^+-]{8,16}$/,
      "Password should be Between 8-16 characters long. And it should contain Atleast One Number, One Special Character, One Uppercase and One Lowercase."
    ),
});
