<template>
    <div class="container payment-container">
    <div class="row">
      <div class="col-md-8">
        <h5 class="mb-3">Phương thức thanh toán</h5>
        <div class="payment-method-list">
          <div class="form-check mb-2">
            <input class="form-check-input mt-5" type="radio" name="paymentMethod" id="payoo" value="payoo" checked>
            <label class="form-check-label" for="payoo">
              <img src="https://cdn.galaxycine.vn/media/2021/12/2/download_1638460623615.png" class="text-start" alt="Payoo" style="height: 140px; margin-right: 140px;">
            </label>
          </div>
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
            <p class="mt-3" style="color: black">
              <p><strong>Galaxy Đà Nẵng - RAP 3</strong></p>
              Suất: <b>{{ query.releaseDate }} - {{ query.startTime }}</b>
            </p>
            <p>Số lượng ghế: <strong>{{ query.seatCount }}</strong></p>
            <p style="color: black;">
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
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const query = route.query;

function formatVND(amount) {
  return Number(amount).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}
// Hàm xử lý khi nhấn nút Thanh toán
async function goToPaymentVnPay() {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Bạn chưa đăng nhập!");
            return;
        }

        const payload = new URLSearchParams();
        payload.append("amount", query.totalPrice);
        payload.append("orderInfo", `Vé xem phim: ${query.title} - Ghế: ${query.selectedSeats}`);

        const response = await axios.post(
            "http://localhost:8080/api/v1/abc/submitOrder", // ✅ Đã sửa đường dẫn
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        console.log("URL VNPAY:", response.data);
        window.location.href = response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API thanh toán:", error.response ? error.response.data : error);
        alert("Có lỗi xảy ra khi thực hiện thanh toán!");
    }
}


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
</style>
