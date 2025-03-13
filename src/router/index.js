import { createRouter, createWebHistory } from "vue-router";
import { jwtDecode } from "jwt-decode";

// Import các trang chính
import Home from "@/views/Home.vue";
import MovieDetail from "@/views/movies/MovieDetail.vue";
import infoUser from "@/views/user/infoUser.vue";
import History from "@/views/user/History.vue";
import Booking from "@/views/Booking/Booking.vue";
import Payment from "@/views/Booking/Payment.vue";
import paymentResult from "@/views/Booking/payment-result.vue";

// Import trang Admin
import AdminLayout from "@/admin/Layouts/AdminLayouts.vue";
import AdminRegister from "@/admin/views/AdminRegister.vue";


// Hàm lấy quyền user từ token
function getUserRole() {
  const adminInfo = localStorage.getItem("adminInfo");
  const userInfo = localStorage.getItem("userInfo");

  if (adminInfo) {
    try {
      const adminData = JSON.parse(adminInfo);
      return adminData.role || null; // Lấy role Admin nếu tồn tại
    } catch (e) {
      return null;
    }
  }

  if (userInfo) {
    try {
      const userData = JSON.parse(userInfo);
      return userData.role || null; // Lấy role User nếu tồn tại
    } catch (e) {
      return null;
    }
  }

  return null;
}

// Khai báo các routes
const routes = [
  { path: "/", component: Home },
  { path: "/movie/detail/:id", component: MovieDetail, name: "MovieDetail" },
  { path: "/user/infoUser", component: infoUser, name: "InfoUser" },
  { path: "/user/History", component: History, name: "History" },
  { path: "/booking", name: "Booking", component: Booking },
  { path: "/payment", name: "Payment", component: Payment },
  { path: "/payment-result", name: "paymentResult", component: paymentResult },

  { path: "/admin/register", component: AdminRegister }, // Đăng ký Admin

  // Routes cho Admin
  {
    path: "/admin",
    component: AdminLayout,
    meta: { requiresAdmin: true },
    children: [
      { path: "dashboard", component: () => import("@/admin/views/DashBoard.vue") },
      { path: "users", component: () => import("@/admin/views/Users.vue") },
      { path: "movie", component: () => import("@/admin/views/ManageMovie.vue") },
    ],
  },
];

// Tạo router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware kiểm tra quyền truy cập
router.beforeEach((to, from, next) => {
  const userRole = getUserRole();
  const isAuthenticated = !!userRole; // Kiểm tra xem người dùng có đăng nhập không

  //  Chặn Admin truy cập trang User
  if (userRole === "ADMIN" && !to.meta.requiresAdmin) {
    toastr.error("Bạn không có quyền truy cập trang người dùng!");
    return next("/admin/dashboard"); // Điều hướng về trang Admin
  }

  //  Nếu truy cập trang Admin mà không có quyền → Chặn
  if (to.meta.requiresAdmin && userRole !== "ADMIN") {
    toastr.error("Bạn không có quyền truy cập trang Admin!");
    return next("/"); // Quay về trang Home nếu không phải Admin
  }

  //  Nếu đã đăng nhập mà vào lại login hoặc admin register → Chặn
  if ((to.path === "/login" || to.path === "/admin/register") && isAuthenticated) {
    toastr.warning("Bạn đã đăng nhập rồi!");
    return next("/"); // Nếu đã đăng nhập, không cho phép vào login/register
  }

  next(); // Cho phép đi tiếp nếu đủ quyền
});

export default router;