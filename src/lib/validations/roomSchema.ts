import * as Yup from "yup"

export const roomSchema = Yup.object({
  name: Yup.string().required("Nama wajib diisi"),
  status: Yup.mixed<"available" | "reserved" | "occupied">()
    .oneOf(["available", "reserved", "occupied"], "Status tidak valid")
    .required("Status wajib diisi"),
  image: Yup.string().required("Gambar wajib diunggah"),
})
