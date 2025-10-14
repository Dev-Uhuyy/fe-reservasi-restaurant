import * as Yup from "yup"

export const menuSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .min(0, "Price must be at least 0")
    .required("Price is required"),
  categoryId: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  stock: Yup.number()
    .typeError("Stock must be a number")
    .min(0, "Stock must be at least 0")
    .required("Stock is required"),
  unit: Yup.string().required("Unit is required"),
  status: Yup.mixed<"active" | "inactive">()
    .oneOf(["active", "inactive"], "Invalid status")
    .required("Status is required"),
  imageFile: Yup.mixed().nullable(), // optional file
})
