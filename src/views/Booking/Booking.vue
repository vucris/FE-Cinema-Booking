<template>
  <div class="container mt-4 booking-page">
    <div class="row">
      <div class="col-md-8 seat-selection">
        <h5 class="fw-bold">ĐỔI SUẤT CHIẾU</h5>
        <div class="seat-map p-3 border rounded bg-light">
          <div class="seat-map p-3 border rounded">
            <div class="screen text-center mb-3">Màn hình</div>
            <hr />
            <div class="seat-grid">
              <div
                v-for="(row, rowIndex) in seatRows"
                :key="rowIndex"
                class="d-flex align-items-center"
              >
                <strong class="me-2">{{ row.columnChair }}</strong>
                <div v-for="(seat, seatIndex) in row.rowChairs" :key="seatIndex">
                  <button
                    @click="toggleSeat(row.columnChair, seat)"
                    :class="[
                      'seat-btn',
                      seatStatus(row.columnChair, seat, row.status[seatIndex]),
                    ]"
                  >
                    {{ seat }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="seat-legend d-flex align-items-center mt-3">
            <div class="seat-box selected"></div>
            <span class="ms-2">Ghế đã bán</span>
            <div class="seat-box available ms-4"></div>
            <span class="ms-2">Ghế trống</span>
          </div>
        </div>
      </div>

      <div class="col-md-4 booking-info p-3 border rounded">
        <h5>
          <b>{{ movie.title }}</b>
        </h5>
        <img :src="movie.image" class="img-fluid my-2" alt="Poster phim" />
        <p><strong>Galaxy Đà Nẵng - RAP 3</strong></p>
        <p>
          Suất: <b>{{ movie.startTime }} - {{ movie.releaseDate }}</b>
        </p>

        <hr />
        <div class="d-flex justify-content-between">
          <span>{{ selectedSeats.length }}x Ghế đơn</span>
          <strong>{{ formatVND(selectedSeats.length * movie.price) }}</strong>
        </div>
        <div class="d-flex justify-content-between">
          <span
            >Ghế: <strong>{{ selectedSeats.join(", ") }}</strong></span
          >
        </div>
        <hr />
        <div class="d-flex justify-content-between">
          <span><strong>Tổng cộng:</strong></span>
          <strong class="text-orange">{{
            formatVND(selectedSeats.length * movie.price)
          }}</strong>
        </div>
        <div class="mt-4 text-right btn-group">
          <button class="btn-back" @click="goToMovieDetail">Quay lại</button>
          <button class="btn-update" @click="goToPayment" :disabled="isLoading">
            <span v-if="isLoading">⏳ Đang xử lý...</span>
            <span v-else>Tiếp tục</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Hiệu ứng loading toàn trang -->

  <div v-if="isLoading" class="loading-fullscreen">
    <svg class="spinner-svg" viewBox="0 0 50 50">
      <circle
        class="spinner-path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
      ></circle>
    </svg>
    <p>Đang xử lý đặt vé, chờ xíu nhé...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
const route = useRoute();
const router = useRouter();
import toastr from "@/helpers/toastr";
const movie = ref({
  movieId: Number(route.query.movieId) || null,
  showtimeId: Number(route.query.showtimeId) || null,
  title: route.query.title || "",
  image: route.query.image || "",
  releaseDate: route.query.releaseDate || "",
  startTime: route.query.startTime || "",
  price: Number(route.query.price) || 0,
});

const goToMovieDetail = () => {
  router.push("/"); // Thay đường dẫn phù hợp với router của bạn
};
const seatRows = ref([]);
const selectedSeats = ref([]); // Ghế đang chọn
const isLoading = ref(false); // Trạng thái loading
async function fetchSeats() {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo?.token) {
      alert("Bạn chưa đăng nhập!");
      router.push("/login");
      return;
    }
    const response = await axios.get(
      `http://localhost:8080/api/v1/customer/chair/byMovieAndShowDateAndShowTime`,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
        params: {
          movieId: movie.value.movieId,
          showDateId: Number(route.query.showDateId),
          showTimeId: movie.value.showtimeId,
        },
      }
    );
    seatRows.value = response.data.chairs;
  } catch (error) {
    console.error("Lỗi khi tải danh sách ghế:", error);
  }
}
onMounted(fetchSeats);
// Format tiền VND
function formatVND(value) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    value
  );
}
// Xác định trạng thái ghế
function seatStatus(row, seat, status) {
  const seatCode = `${row}${seat}`;
  if (status === 0) return "sold"; // Ghế đã đặt từ backend (màu vàng)
  if (selectedSeats.value.includes(seatCode)) return "selected"; // Ghế đang chọn (màu xanh)
  return "available"; // Ghế trống (màu trắng)
}
// Xử lý chọn ghế
function toggleSeat(row, seat) {
  const seatCode = `${row}${seat}`;
  const chair = seatRows.value.find((r) => r.columnChair === row);
  const seatIndex = chair?.rowChairs.indexOf(seat);
  if (seatIndex === -1 || chair.status[seatIndex] === 0) {
    return; // Ghế đã đặt thì không được chọn
  }
  if (selectedSeats.value.includes(seatCode)) {
    selectedSeats.value = selectedSeats.value.filter((s) => s !== seatCode);
  } else {
    selectedSeats.value.push(seatCode);
  }
}
function goToPayment() {
  if (selectedSeats.value.length === 0) {
    toastr.warning("Vui lòng chọn ghế trước khi tiếp tục!");
    return;
  }

  isLoading.value = true; // Hiển thị loading

  setTimeout(() => {
    isLoading.value = false; // Tắt loading
    const query = {
      movieId: movie.value.movieId,
      showtimeId: movie.value.showtimeId,
      title: movie.value.title,
      image: movie.value.image,
      releaseDate: movie.value.releaseDate,
      startTime: movie.value.startTime,
      price: movie.value.price,
      selectedSeats: selectedSeats.value.join(","),
      totalPrice: selectedSeats.value.length * movie.value.price,
      seatCount: selectedSeats.value.length,
      showDateId: Number(route.query.showDateId),
    };
    router.push({ path: "/payment", query }); // Chuyển trang sau 3 giây
  }, 2500);
}
</script>
<style scoped>
.booking-page {
  max-width: 1000px;
  color: #000; /* Đảm bảo text toàn bộ màu đen */
}

h5,
p,
span,
strong {
  color: #000 !important; /* Ưu tiên cao hơn */
}

.seat-grid {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Khoảng cách giữa các hàng */
}

.seat-grid > div {
  display: flex;
  align-items: center;
  gap: 8px; /* Khoảng cách giữa chữ hàng và các ghế */
}

/* Kích thước và style ghế */
.seat-btn {
  width: 40px;
  height: 40px;
  margin: 2px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

/* Trạng thái ghế */
.seat-btn.available {
  background-color: #f0f0f0;
  color: #333;
}

.seat-btn.sold {
  background-color: gold;
  color: #fff;
  cursor: not-allowed;
}

.seat-btn.selected {
  background-color: #28a745;
  color: #fff;
}

/* Màn hình */
.screen {
  background-color: #ec4b00;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
}

/* Grid sắp ghế */
.seat-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
strong {
  min-width: 20px; /* Đảm bảo chữ hàng có độ rộng cố định */
  text-align: right;
  font-weight: bold;
}

.btn-group {
  display: flex;
  justify-content: flex-end;
  gap: 8px; /* Khoảng cách giữa 2 nút */
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
hr {
  border: none;
  height: 3px;
  background: linear-gradient(to right, #e74100, #e43500);
  margin: 20px 0;
}
.seat-btn {
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;
}
.seat-btn.selected {
  background-color: rgb(0, 195, 29);
  border-color: #ffcc00;
}
.seat-box {
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  margin-right: 5px;
}
.seat-box.selected {
  background-color: yellow;
}
.seat-box.available {
  background-color: white;
}
.loading-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 20px;
  font-weight: bold;
  z-index: 9999;
}

.spinner-svg {
  width: 80px;
  height: 80px;
  animation: rotate 1.5s linear infinite;
}

.spinner-path {
  stroke: #ff6600;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -125;
  }
}
</style>
