import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập họ và tên."),
  phone: yup
    .string()
    .required("Vui lòng nhập số điện thoại.")
    .matches(/^\d{10}$/, "Số điện thoại không hợp lệ."),
  address: yup.string().required("Vui lòng nhập địa chỉ."),
  education: yup.string().required("Vui lòng chọn học vấn."),
  certification: yup.string().required("Vui lòng chọn chứng chỉ."),
  gender: yup.string().required("Vui lòng chọn giới tính."),
});
