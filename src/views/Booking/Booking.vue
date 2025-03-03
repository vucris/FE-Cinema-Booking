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
                <strong class="me-2">{{ row }}</strong>
                <!-- ✅ Thêm chữ bên trái -->
                <div v-for="(seat, seatIndex) in seatColumns" :key="seatIndex">
                  <button
                    @click="toggleSeat(row, seat)"
                    :class="['seat-btn', seatStatus(row, seat)]"
                  >
                    {{ seat }}
                  </button>
                </div>
              </div>
            </div>
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
          Suất: <b style=""> {{ movie.startTime }} - {{ movie.releaseDate }} </b>
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
          <button class="btn-back">Quay lại</button>
          <button class="btn-update" @click="goToPayment">Tiếp tục</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router"; // ✅ import useRouter

const route = useRoute();
const router = useRouter(); // ✅ Khởi tạo router

const movie = ref({
  id: route.query.movieId,
  title: route.query.title,
  image: route.query.image,
  releaseDate: route.query.releaseDate,
  startTime: route.query.startTime,
  price: Number(route.query.price) || 0,
});

const seatRows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const seatColumns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const soldSeats = ref(["C5", "D6", "F7", "G8"]);
const selectedSeats = ref([]);

// Hàm format tiền VND
function formatVND(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}

function toggleSeat(row, seat) {
  const seatCode = `${row}${seat}`;
  if (soldSeats.value.includes(seatCode)) return;
  if (selectedSeats.value.includes(seatCode)) {
    selectedSeats.value = selectedSeats.value.filter((s) => s !== seatCode);
  } else {
    selectedSeats.value.push(seatCode);
  }
}

function seatStatus(row, seat) {
  const seatCode = `${row}${seat}`;
  if (soldSeats.value.includes(seatCode)) return "sold";
  if (selectedSeats.value.includes(seatCode)) return "selected";
  return "";
}

function goToPayment() {
  const query = {
    movieId: movie.value.id,
    title: movie.value.title,
    image: movie.value.image,
    releaseDate: movie.value.releaseDate,
    startTime: movie.value.startTime,
    price: movie.value.price,
    selectedSeats: selectedSeats.value.join(","), // chuỗi ghế: A1,A2,A3
    totalPrice: selectedSeats.value.length * movie.value.price,
    seatCount: selectedSeats.value.length ,
  };

  router.push({ path: "/payment", query }); // ✅ Bây giờ router đã sẵn sàng
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

.seat-btn {
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f8f9fa;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.seat-btn:hover {
  background-color: #dee2e6;
}

.seat-btn.selected {
  background-color: #28a745;
  color: white;
}

.seat-btn.occupied {
  background-color: #dc3545;
  color: white;
  cursor: not-allowed;
}

.seat-btn.available {
  background-color: #f8f9fa;
  color: black;
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
</style>
