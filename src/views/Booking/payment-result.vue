<template>
  <div class="payment-container">
    <h2 v-if="paymentStatus === 'pending'">Vui lòng</h2>
    <h2 v-else-if="paymentStatus === 'success'">Thanh toán thành công!</h2>
    <h2 v-else>Thanh toán thất bại!</h2>
    <Modal :isOpen="isModalOpen" @close="closeModal">
      <h2 class="mt-3">Xác nhận đặt vé</h2>
      <p>
        Phim: <b>{{ bookingData?.title }}</b>
      </p>
      <p>Phòng: Galaxy Đà Nẵng - RAP 3</p>
      <p>
        Suất chiếu: <b>{{ bookingData?.releaseDate }} - {{ bookingData?.startTime }}</b>
      </p>
      <p>
        Ghế:
        <strong
          ><b>{{ bookingData?.selectedSeats }}</b></strong
        >
      </p>
      <p>
        Tổng tiền: <strong>{{ formatVND(bookingData?.totalPrice) }}</strong>
      </p>
      <button class="btn-update" @click="closeModal">Xác nhận</button>
      <button
        class="btn-savepdf ms-3"
        @click="downloadTicket"
        v-if="paymentStatus === 'success'"
      >
        Tải vé xuống
      </button>
    </Modal>
  </div>
</template>
<script setup>
import { onMounted, ref,getCurrentInstance  } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import removeAccents from "remove-accents";
import QRious from "qrious"; // Dùng để tạo mã QR

const { proxy } = getCurrentInstance();
const paymentStatus = ref("pending");
const isModalOpen = ref(false);
const bookingData = ref(null); // ✅ Lưu dữ liệu từ localStorage
const router = useRouter();
const route = useRoute();
import { format } from "date-fns";

//  Lấy token từ URL và cập nhật localStorage
const token = route.query.token;
if (token) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  userInfo.token = token;
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
}

onMounted(async () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo?.token) {
    proxy.$showErrorAlert("Không tìm thấy token! Vui lòng đăng nhập lại.");
    router.push("/login");
    return;
  }

  // Lấy dữ liệu booking từ localStorage
  bookingData.value = JSON.parse(localStorage.getItem("bookingData"));
  console.log("Dữ liệu bookingData từ localStorage:", bookingData.value);

  if (!bookingData.value) {
    proxy.$showErrorAlert("Không tìm thấy thông tin đặt vé!");
    return;
  }

  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/customer/vnpay/payment-return",
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
        params: route.query,
      }
    );

    console.log("Kết quả thanh toán:", response.data);

    if (response.data.paymentStatus === "Success") {
      await proxy.$swal.fire({
        title: "Thanh toán thành công!",
        text: "Vé của bạn đã được đặt.",
        icon: "success",
        confirmButtonText: "OK",
      });

      paymentStatus.value = "success";
      await sendBookingToServer(userInfo.token);
      isModalOpen.value = true;
    } else {
      proxy.$showErrorAlert("Thanh toán thất bại!");
      paymentStatus.value = "failed";
    }
  } catch (error) {
    console.error("Lỗi khi xử lý kết quả thanh toán:", error);
    proxy.$showErrorAlert("Lỗi khi lấy thông tin thanh toán!");
    paymentStatus.value = "failed";
  }
});

// Gửi thông tin đặt vé lên server
async function sendBookingToServer(token) {
  if (!bookingData.value) {
    proxy.$showErrorAlert("Không tìm thấy thông tin đặt vé!");
    return;
  }
  // Chuyển đổi ngày từ dd-MM-yyyy sang yyyy-MM-dd
  const formattedShowDate = format(
    new Date(bookingData.value.releaseDate.split("-").reverse().join("-")),
    "yyyy-MM-dd"
  );
  const ticketData = {
    showtimeId: Number(bookingData.value.showtimeId),
    promotionId: bookingData.value.promotionId
      ? Number(bookingData.value.promotionId)
      : null,
    nameChair: bookingData.value.selectedSeats,
    nameMovie: bookingData.value.title,
    nameRoom: "A1",
    numberChair: Number(bookingData.value.seatCount),
    totalPrice: Number(bookingData.value.totalPrice),
    showDate: formattedShowDate,
  };
  console.log("Dữ liệu gửi lên server:", ticketData);
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/customer/booking-movie",
      ticketData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Phản hồi từ server:", response.data);
    localStorage.removeItem("bookingData");
  } catch (error) {
    console.error(
      "Lỗi khi gửi thông tin đặt vé:",
      error.response ? error.response.data : error
    );
    alert("Gửi thông tin đặt vé thất bại!");
  }
}
// ✅ Đóng modal và chuyển hướng
const closeModal = () => {
  isModalOpen.value = false;
  router.push("/");
};
function formatVND(amount) {
  if (!amount) return "0 VND"; // Tránh lỗi khi giá trị rỗng
  return Number(amount).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}
/// file pdf
// Tạo file PDF vé xem phim và tải xuống
function downloadTicket() {
  const doc = new jsPDF();
  // Chuyển toàn bộ nội dung thành không dấu
  const movieTitle = removeAccents(bookingData.value.title);
  const showtime = removeAccents(
    `${bookingData.value.releaseDate} - ${bookingData.value.startTime}`
  );
  const seat = removeAccents(bookingData.value.selectedSeats);
  const price = removeAccents(formatVND(bookingData.value.totalPrice));
  // Thiết kế khung vé
  doc.setFillColor(240, 240, 240); // Màu nền xám nhẹ
  doc.roundedRect(10, 10, 190, 120, 5, 5, "F"); // Khung bo góc mềm mại
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(255, 87, 34); // Màu cam nổi bật
  doc.text(" Cinema Booking CDIO 4 2025 ", 60, 25);
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0); // Màu đen
  doc.text(` Phim: ${movieTitle}`, 20, 40);
  doc.text(` Showtime: ${showtime}`, 20, 50);
  doc.text(` Seat: ${seat}`, 20, 60);
  doc.text(` Price: ${price}`, 20, 70);
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text("Thank you for choosing Galaxy Cinema!", 20, 90);
  // Tạo mã QR chứa thông tin vé
  const qr = new QRious({
    value: `Movie: ${movieTitle}\nShowtime: ${showtime}\nSeat: ${seat}`,
    size: 100,
  });
  const qrImg = qr.toDataURL();
  //  Chèn mã QR vào vé
  doc.addImage(qrImg, "PNG", 75, 100, 50, 50);
  // Tải vé xuống
  doc.save("movie_ticket.pdf");
}
</script>
<style scoped>
.payment-container {
  max-width: 600px;
  margin: 50px auto;
  background-color: #fff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2); /* Bóng đổ */
  text-align: center;
  transition: all 0.3s ease;
}

.payment-container h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #5c1b14;
}

.payment-container p {
  font-size: 16px;
  color: #000000;
  margin: 8px 0;
}

.payment-container strong {
  color: #e74c3c;
}

.payment-container .btn-update {
  margin-top: 15px;
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.payment-container .btn-update:hover {
  background-color: #218838;
}

.payment-container .btn-savepdf {
  margin-top: 15px;
  background-color: #ce7b00;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.payment-container .btn-savepdf:hover {
  background-color: #f99100;
}

/* Modal */
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 90%;
  max-width: 500px;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3); /* Bóng đổ mạnh hơn */
  z-index: 1000;
  animation: slideIn 0.4s ease forwards;
}

.modal h2 {
  font-size: 22px;
  color: #444;
  margin-bottom: 15px;
}

.modal p {
  font-size: 16px;
  color: #666;
  margin: 5px 0;
}

.modal button {
  margin-top: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.modal button:hover {
  background-color: #0056b3;
}

/* Overlay nền mờ phía sau modal */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
}

/* Animation xuất hiện */
@keyframes slideIn {
  from {
    transform: translate(-50%, -60%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
}
</style>
