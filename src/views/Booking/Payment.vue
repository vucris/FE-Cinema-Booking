<template>
 <div class="container payment-container">
    <div class="row">
      <div class="col-md-8">
        <h5 class="mb-3">Phương thức thanh toán</h5>
        <div class="payment-method-list">
          <!-- Payoo -->
          <label class="payment-option">
            <input type="radio" name="paymentMethod" value="payoo" checked>
            <div class="payment-content">
              <img src="https://cdn.galaxycine.vn/media/2021/12/2/download_1638460623615.png" alt="Payoo">
            </div>
          </label>
          <!-- Momo -->
          <label class="payment-option">
            <input type="radio" name="paymentMethod" value="momo">
            <div class="payment-content">
              <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="Momo">
            </div>
          </label>
        </div>
      </div>
  
      <div class="col-md-4">
        <div class="ticket-info-box p-3 border rounded">
          <hr />
          <div class="d-flex">
            <img :src="query.image" alt="Poster" class="movie-poster me-2" />
            <div><h5>{{ query.title }}</h5></div>
          </div>
          <div class="text-start">
            <p class="mt-3">
              <p><strong>Galaxy Đà Nẵng - RAP 3</strong></p>
              Suất: <b>{{ query.releaseDate }} - {{ query.startTime }}</b>
            </p>
            <p>Số lượng ghế: <strong>{{ query.seatCount }}</strong></p>
            <p>
              Ghế: <strong><b>{{ query.selectedSeats }}</b></strong>
            </p>
            <hr />
            <div class="d-flex justify-content-between">
              <span>Tổng cộng:</span>
              <strong class="text-orange">{{ formatVND(query.totalPrice) }}</strong>
            </div>
          </div>
          <div class="mt-4 text-right btn-group">
            <button class="btn-back me-5">Quay lại</button>
            <button class="btn-update" @click="goToPaymentVnPay">Thanh toán</button>
         
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Modal from "@/components/Modal.vue";

const route = useRoute();
const router = useRouter();
const query = route.query;
const isModalOpen = ref(false);
const selectedSeats = ref([]);
console.log("🚀 Query từ route:", query);
console.log("📍 selectedSeats dạng string:", query.selectedSeats);
function formatVND(amount) {
  return Number(amount).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}

// Mở modal
function openModal() {
  isModalOpen.value = true;
}

// Đóng modal
function closeModal() {
  isModalOpen.value = false;
}

// Hàm gọi API VNPay
const goToPaymentVnPay = async () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo?.token) {
    alert("Vui lòng đăng nhập!");
    router.push("/login");
    return;
  }
 
  //  Kiểm tra dữ liệu trước khi gửi
  if (!query.totalPrice || !query.title || !query.selectedSeats) {
    alert("Dữ liệu đặt vé không hợp lệ!");
    return;
  }

  const returnUrl = `${window.location.origin}/payment-result`; // 🛠 URL FE sau khi thanh toán
  const amount = Number(query.totalPrice);
  //  Lưu dữ liệu booking vào localStorage (để lấy lại sau thanh toán)
  localStorage.setItem("bookingData", JSON.stringify(query));
// console.log(" Dữ liệu bookingData đã lưu vào localStorage:", JSON.parse(localStorage.getItem("bookingData")));
  const orderInfo = `Vé xem phim: ${query.title}, Ghế: ${query.selectedSeats}`;
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/customer/vnpay/create-order",
      null,
      {
        params: { amount, orderInfo, returnUrl },
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    //  Lưu token và bookingData vào localStorage thay vì sessionStorage
    localStorage.setItem("authToken", userInfo.token);
    localStorage.setItem("bookingData", JSON.stringify(query));

    window.location.href = response.data.paymentUrl;
  } catch (error) {
    console.error("Lỗi tạo đơn VNPay:", error);
    alert("Lỗi tạo đơn VNPay!");
  }
};
</script>
<style scoped>
.payment-container {
  padding: 20px;
  background-color: #f5f5f5;
}
.promotion-box,
.payment-method-box,
.ticket-info-box {
  background-color: #fff;
}
.movie-poster {
  width: 170px;
  height: 250px;
  object-fit: cover;
}
* {
  color: black !important;
}
.btn-back,
.btn-update {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}
.btn-update {
  background-color: #ff5500;
  color: white;
}
.btn-update:hover {
  background-color: rgba(255, 85, 0, 0.4);
  transform: translateY(-2px);
}
.btn-back {
  background-color: #f0f0f0;
  color: #333;
}
.btn-back:hover {
  background-color: #e0e0e0;
  transform: translateY(-2px);
}
::v-deep(.text-orange) {
  color: orangered !important;
  font-weight: bold;
}
.ticket-info-box {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
/* Container chính */
.payment-container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Danh sách phương thức thanh toán */
.payment-method-list {
  display: flex;
  gap: 15px;
}

/* Tùy chọn thanh toán */
.payment-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid transparent;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background: #f9f9f9;
  width: 150px;
  height: 150px;
  text-align: center;
}

/* Hình ảnh thanh toán */
.payment-content img {
  width: 100px;
  height: auto;
}

/* Ẩn radio mặc định */
.payment-option input {
  display: none;
}

/* Hiệu ứng khi được chọn */
.payment-option input:checked + .payment-content {
  border: 7px solid #009463cc;
  background: rgba(255, 85, 0, 0.1);
  border-radius: 10px;
}

/* Hover */
.payment-option:hover {
  transform: scale(1.05);
  border: 2px solid #ff5500;
}
</style>
