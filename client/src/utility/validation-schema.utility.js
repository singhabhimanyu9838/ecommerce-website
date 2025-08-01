import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

const signupSchema = Yup.object({
  userName: Yup.string().required('Name is required').trim(),
  email: Yup.string().email('Invalid email').required('Email cannot be empty!').trim(),
  password: Yup.string().password().required('Password is required'),
});

const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email cannot be empty!').trim(),
  password: Yup.string().password().required('Password is required'),
});

export { loginSchema, signupSchema };
