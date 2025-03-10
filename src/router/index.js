import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import MovieDetail from "@/views/movies/MovieDetail.vue";
import infoUser from "@/views/user/infoUser.vue";
import History from "@/views/user/History.vue";
import Booking from "@/views/Booking/Booking.vue";
import Payment from "@/views/Booking/Payment.vue";
import paymentResult from "@/views/Booking/payment-result.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/movie/detail/:id", component: MovieDetail, name: "MovieDetail" },
  { path: "/user/infoUser", component: infoUser, name: "InfoUser" },
  { path: "/user/History", component: History, name: "History" },
  { path: "/booking", name: "Booking", component: Booking },
  { path: "/payment", name: "Payment", component: Payment},
  { path: "/payment-result", name: "paymentResult", component: paymentResult},

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
