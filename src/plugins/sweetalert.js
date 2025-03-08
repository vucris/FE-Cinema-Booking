import Swal from "sweetalert2";

export default {
  install: (app) => {
    app.config.globalProperties.$swal = Swal;

    app.config.globalProperties.$showSuccessAlert = (
      message = "Thành công!"
    ) => {
      Swal.fire({
        title: "Thành công!",
        text: message,
        icon: "success",
        confirmButtonText: "OK",
      });
    };

    app.config.globalProperties.$showErrorAlert = (
      message = "Đã có lỗi xảy ra!"
    ) => {
      Swal.fire({
        title: "Lỗi!",
        text: message,
        icon: "error",
        confirmButtonText: "OK",
      });
    };

    app.config.globalProperties.$showConfirmAlert = (
      message = "Bạn có chắc không?"
    ) => {
      return Swal.fire({
        title: "Xác nhận!",
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
      });
    };
  },
};
