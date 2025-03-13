<template v-if="movie">
  <div class="movie-detail">
    <div class="trailer-banner">
      <img
        src="https://cdn.galaxycine.vn/media/2025/2/17/nha-gia-tien-750_1739775155248.jpg"
        alt="Poster phim"
      />
    </div>
  </div>
  <div class="container mt-3">
    <div class="row align-items-start">
      <div class="col-md-8 d-flex">
        <div class="movie-info-container d-flex flex-column">
          <div class="d-flex">
            <div class="me-3">
              <img
                :src="movie.image"
                alt="Poster phim"
                class="img-fluid rounded"
                style="width: 200px"
              />
            </div>
            <div class="flex-grow-1 text-dark text-start">
              <h2 class="fw-bold mb-2" style="font-size: 22px">{{ movie.title }}</h2>
              <div class="mb-2" style="font-size: 14px">
                <span class="me-3">
                  <i class="bi bi-clock" style="color: gold"></i>
                  {{ movie.duration }} phút
                </span>
                <span>
                  <i class="bi bi-calendar" style="color: gold"></i>
                  {{ movie.releaseDate }}
                </span>
              </div>
              <div class="fs-5 text-warning mb-2 mt-4">⭐ {{ movie.rating }}</div>
              <ul class="list-unstyled mb-0 mt-4" style="font-size: 14px">
                <li><strong>Quốc gia: </strong> {{ movie.nation }}</li>
                <p class="mt-2"> <strong>Nhà sản xuất: </strong> {{ movie.nameDirector }}</p>
                <!-- <p class="mt-2">Đạo diễn:</p> -->
                <li class="mt-2"><strong>Đạo diễn:</strong> {{ movie.nameDirector }}</li>
                <!-- <p class="mt-2">Diễn viên:</p> -->
                <li class="mt-2">
                  <strong>Diễn viên: </strong>
                  <span v-if="movie.performers.length > 0">
                    {{ movie.performers.map((p) => p.name).join(", ") }}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div class="movie-description">
            <strong>Nội dung phim:</strong>
            <p>{{ movie.description }}</p>
          </div>
          <hr />
          <div class="movie-description">
            <strong>Lịch chiếu</strong>
            <div class="d-flex flex-wrap gap-2 mt-3">
              <button
                v-for="date in movie.showDatesWithTimes"
                :key="date.id"
                class="schedule-buttons"
                @click="selectShowTimes(date)"
              >
                📅 Ngày: <strong>{{ date.dateShow }}</strong>
              </button>
            </div>

            <ul v-if="selectedShowTimes.length" class="mt-3">
              <li style="list-style-type: none;">
                <div class="d-flex gap-3">
                  <button
                    v-for="time in selectedShowTimes"
                    :key="time.id"
                    class="time-btn"
                    @click="
                      goToBooking(selectedDateShow, time.startTime, time.price, time.id)
                    "
                  >
                    ⏰ {{ time.startTime }}
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <h5>PHIM ĐANG CHIẾU</h5>
        <hr />
        <img
          src="https://s3-alpha-sig.figma.com/img/5c1e/bdec/a71b0fc126ae4ee0d69169cc52f6def6?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fJ7Qk~9GMG5WRjeiNsfoRhU7yMJz4f6yP3A-FCLU9jiVC8HtJW489YhqE1XDusEjTJOw9D6Y6Rq40JqSFAIUjISAn5MEP0pcjprJLNRzQUPgcog2cR24nwhPWhUEx-K8hJP5L08BrLQHFvWVB345fqZbHG8GFTVtLo297xPbGywVVBR7Nqc9nTbDtEvNFs5LMVSBzENgvtusI2rtLK9h0FPLUjueVLvovokS5QMedEVNDG6EeBUWmLu~d-ibyEWOWW0ZwgO-tPzLLUJJUaVI~8ftD52ijEsObsmT9BgFOOaiEB63lFjXCAXS5ktajvmvOIR1weVyneGz493xotVlyQ__"
        />
        <h3><p class="mt-3 fw-bold text-start">Hành Tinh Khỉ: Vương Quốc Mới</p></h3>
        <hr class="dashed-hr" />
        <img
          src="https://s3-alpha-sig.figma.com/img/5c1e/bdec/a71b0fc126ae4ee0d69169cc52f6def6?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fJ7Qk~9GMG5WRjeiNsfoRhU7yMJz4f6yP3A-FCLU9jiVC8HtJW489YhqE1XDusEjTJOw9D6Y6Rq40JqSFAIUjISAn5MEP0pcjprJLNRzQUPgcog2cR24nwhPWhUEx-K8hJP5L08BrLQHFvWVB345fqZbHG8GFTVtLo297xPbGywVVBR7Nqc9nTbDtEvNFs5LMVSBzENgvtusI2rtLK9h0FPLUjueVLvovokS5QMedEVNDG6EeBUWmLu~d-ibyEWOWW0ZwgO-tPzLLUJJUaVI~8ftD52ijEsObsmT9BgFOOaiEB63lFjXCAXS5ktajvmvOIR1weVyneGz493xotVlyQ__"
        />
        <h3><p class="mt-3 fw-bold text-start">Hành Tinh Khỉ: Vương Quốc Mới</p></h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { useModalStore } from "@/stores/modalStore";
export default {
  data() {
    return {
      movie: null,
      selectedShowTimes: [],
      selectedDateShow: "",
      modalStore: useModalStore(), // Khởi tạo store ở đây
    };
  },
  created() {
    const movieId = this.$route.params.id;
    axios
      .get(`http://localhost:8080/api/v1/auth/movie/${movieId}`)
      .then((response) => {
        this.movie = response.data;
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin phim:", error);
      });
  },

  methods: {
    selectShowTimes(date) {
      this.selectedShowTimes = date.showTimes;
      this.selectedDateShow = date.dateShow;
      this.selectedDateId = date.id; //  Lưu id của ngày chiếu
    },
    goToBooking(dateShow, startTime, price, showtimeId) {
      console.log("showtimeId được chọn:", showtimeId); // Debug giá trị trước khi push
      if (!this.modalStore.isAuthenticated) {
        // Nếu chưa đăng nhập, mở modal đăng nhập
        this.modalStore.openLoginModal();
      } else {
        // Nếu đã đăng nhập, chuyển hướng đến trang đặt vé
        this.$router.push({
          path: "/booking",
          query: {
            showtimeId: showtimeId,
            movieId: this.movie.id,
            title: this.movie.title,
            image: this.movie.image,
            releaseDate: dateShow,
            showDateId: this.selectedDateId,
            startTime: startTime,
            price: price,
          },
        });
      }
    },
  },
};
</script>
<style scoped>
.movie-detail {
  background-color: black;
  padding: 0; /* Tạo khoảng cách phía trên và dưới */
  display: flex;
  justify-content: center; /* Căn giữa banner */
}

.trailer-banner {
  width: 75%; /* Điều chỉnh theo nhu cầu, ví dụ 80% màn hình */
  max-width: 800px; /* Giới hạn chiều rộng tối đa */
  overflow: hidden;
  border-radius: 8px; /* Bo góc nhẹ */
}

.trailer-banner img {
  width: 100%;
  height: auto;
  display: block;
}
h2 {
  color: #222;
}
.list-unstyled li {
  margin-bottom: 5px;
}
.container {
  color: #000; /* Màu đen */
}
.movie-showing-item {
  width: 400px; /* Chiều rộng cố định */
  text-align: center;
  margin-bottom: 12px;
}

.movie-showing-item img {
  width: 100%;
  height: 160px; /* Chiều cao cố định */
  object-fit: cover; /* Không méo ảnh */
  border-radius: 8px;
}

.movie-showing-item p.movie-title {
  margin-top: 6px;
  font-size: 14px;
  font-weight: bold;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
.custom-border-start {
  border-left: 1px solid #333; /* Độ dày 3px, màu đen đậm */
}

.movie-description {
  text-align: left;
  margin-top: 16px;
  font-size: 14px;
  line-height: 1.6;
}

.movie-description p {
  margin: 8px 0 0 0; /* tạo khoảng cách trên */
}
.section-title {
  position: relative;
  padding-left: 12px; /* Dịch chữ qua để nhường chỗ cho gạch */
}

.section-title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 7px; /* Độ rộng của gạch */
  background-color: #f39c12; /* Màu gạch (có thể chỉnh) */
}
.section-underline {
  height: 2px; /* Độ dày của gạch */
  background-color: #f39c12; /* Màu gạch */
  margin-top: 4px; /* Khoảng cách với tiêu đề */
  width: 100%; /* Ngang full cột */
}
.title-with-border {
  font-weight: bold;
  position: relative;
  padding-left: 12px;
  font-size: 16px;
}

.time-btn {
  width: 70px;
  height: 40px;
  border: 1px solid #000;
  background-color: #fff;
  color: #000;
  font-size: 14px;
  font-weight: bold;
  border-radius: 6px;
  transition: background-color 0.3s, color 0.3s;
}

.time-btn:hover {
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}
.schedule-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  min-width: 80px;
  transition: all 0.3s ease;
  border: 1px solid #007bff;
  background-color: white;
  color: #007bff;
}

.schedule-btn.active {
  background-color: #007bff;
  color: white;
}

.schedule-btn:hover {
  background-color: #007bff;
  color: white;
}

.schedule-btn .day {
  font-weight: bold;
}

.schedule-btn .date {
  font-size: 14px;
}
.schedule-buttons {
  background-color: #f8f9fa;
  border: 2px solid #ffc107;
  color: #333;
  font-weight: bold;
  font-size: 16px;
  padding: 10px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.schedule-buttons:hover {
  background-color: #ffc107;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.schedule-buttons strong {
  margin-left: 5px;
  font-size: 16px;
}
.dashed-hr {
  border: none;
  border-top: 3px dashed #000000;
  margin: 15px 0;
}
.time-btn {
  padding: 12px 20px; /* Tăng kích thước bên trong */
  font-size: 16px; /* Chữ to hơn */
  min-width: 80px; /* Chiều ngang tối thiểu */
  height: 50px; /* Chiều cao cố định */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border: 2px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.time-btn:hover {
  background-color: #ff5500;
  color: white;
  border-color: #ff5500;
  transform: translateY(-2px); /* Hover nổi lên nhẹ */
}
</style>
