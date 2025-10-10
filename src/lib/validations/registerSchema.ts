import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  name: Yup.string().required("Nama wajib diisi"),
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  phone: Yup.string().required("Nomor telepon wajib diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password wajib diisi"),
});
