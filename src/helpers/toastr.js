import toastr from "toastr";
import "toastr/build/toastr.min.css";

// Cấu hình toastr
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  showDuration: 300,
  hideDuration: 1000,
  timeOut: 3000,
  extendedTimeOut: 1000,
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

export default toastr;
