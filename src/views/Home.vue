<template>
  <div class="slider-container">
    <!-- Ảnh hiển thị -->
    <div class="slider">
      <img :src="images[currentIndex]" alt="Slider Image" class="slider-image" />
    </div>
    <!-- Nút điều hướng -->
    <button class="btn left-btn" @click="prevSlide">❮</button>
    <button class="btn right-btn" @click="nextSlide">❯</button>
  </div>
  <div class="container mt-3">
    <!-- Thanh Menu -->
    <div class="movie-section text-center">
      <div class="category">
        <span style="color: black; font-weight: bold">Phim</span>
        <span class="mx-3">Đang chiếu</span>
        <span class="mx-3">Sắp chiếu</span>
        <span class="mx-3">Phim IMAX</span>
        <span class="mx-3">Toàn quốc</span>
      </div>
    </div>
    <!-- Hàng 4 cột Demo mới -->
    <div class="container mt-4">
      <div class="row">
        <!-- Cột 1 -->
        <div class="col-md-3 p-3 text-black" v-for="movie in movies" :key="movie.id">
          <router-link
            :to="{ name: 'MovieDetail', params: { id: movie.id } }"
            class="text-decoration-none text-dark"
          >
            <div class="movie-card position-relative">
              <img :src="movie.image" :alt="movie.title" class="img-fluid rounded" />
              <!-- Overlay chứa 2 nút -->
              <div class="overlay">
                <button class="btn btn-warning text-white fw-bold buy-ticket">
                  <i class="bi bi-ticket-perforated"></i> Mua vé
                </button>
                <button class="btn btn-outline-light watch-trailer">
                  <i class="bi bi-play-circle"></i> Trailer
                </button>
              </div>
              <!-- Thông tin phim -->
              <div class="movie-info mt-2 text-center">
                <h6 class="fw-bold">{{ movie.title }}</h6>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="line-default"></div>

    <div class="container text-center">
      <!-- Tiêu đề -->
      <div class="category my-3">
        <div class="row align-items-center justify-content-center">
          <span class="border-start border-4 border-primary me-2"></span>
          <span class="fw-bold text-dark">Tin khuyến mãi</span>
        </div>
      </div>
      <!-- Hàng chứa 3 ô -->
      <div class="row justify-content-center">
        <!-- Ô 1 -->
        <div class="col-md-4 col-12 mb-3">
          <div class="box p-3">
            <img
              src="https://s3-alpha-sig.figma.com/img/4510/fb63/9ec93df2ae9ae012cf4aae21818a01d1?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=APbpNIeD6h2kvYNtanjXfl3V2vOwStbtuPoMDz-4sFOZnVAtiuJq6UcPhK1QPIc2HJThOudD-V~~YMp3zemGVK1Pxs4oQxIa0MxStXzccTW~QXBn1xMYw9hoHCOAlLWVS4ntMU5hE7527yDkHkiXuFek-i7siM-iw659Ymm7YvKfgWO~AUjTCP1dKma6YB9y9zeGmIYRehu3AHOsQvKKme0fV5j6R2v6b-drBymxDmJmfETZxQh0jHyjYCg8ZkS2i6YGt0PSm~bzOWVCpyuNLj~gzZm-HXYLx0UpKB-UpQmkHEgS-EVnv7P01eyBGUmkh1hduJki37QxCM32D0LHxQ__"
              class="img-fluid rounded"
              alt="Khuyến mãi 1"
            />
            <p class="mt-2 fw-bold" style="color: black">
              Mưa quà tặng dành cho thành viên GALAXY CINEMA 2025
            </p>
          </div>
        </div>
        <!-- Ô 2 -->
        <div class="col-md-4 col-12 mb-3">
          <div class="box p-3">
            <img
              src="https://s3-alpha-sig.figma.com/img/b757/dd92/a71b8ccbea17a5744a6f9dad0bcdfba3?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ZLLqYDCcaty-wp1zLTe73ajHxRaeFY4DkxO3TzUSanhWsyGZe7ew8s4-wEVLGfP51bSEBa~LAdYiw-CqOG8SBn-7sgaf87~cthmp4FGnEvJpuVOIm1m08gN6GD4OaLQIP6FPB0xaM22p6GEIzVQ-yrUW4uLzHhhr2bMfHNYWMX~xzy1IqMW~ej98zT9s0LS3bDuACvT9c-eBRUOZY7wVplnCaFVriEA8N-sCn0Hc6h7xb2s-Mx38yMNavQvnotEvImWEib01FID6YHo-OmBbjPEC12Cy7hBw16mxY5Bgf0ZIUWPVMBWPThtEsPAvXMEECXbxwRm5yqbZ903iKNoT0w__"
              class="img-fluid rounded"
              alt="Khuyến mãi 2"
            />
            <p class="mt-2 fw-bold" style="color: black">
              U22 Vui vẻ - Bắp nước siêu hạt dẻ
            </p>
          </div>
        </div>

        <!-- Ô 3 -->
        <div class="col-md-4 col-12 mb-3">
          <div class="box p-3">
            <img
              src="https://s3-alpha-sig.figma.com/img/4e8c/8dc8/8add2c46d8d841bd17d2f07cd5aac453?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=kJePj-BzdEEX~8F-0AX-DS~OVlLghI7Hm8BpgSxcPVa207C01nf8gIjm5QU5XbsGgIbQCVbSH20c9MxFSvHLDMuzyLNsLbDWz~zlOcCjhyxp4ur59fdypSW2s-Rh1cD0p7DDx9Q9Q6d~pEHfuI7gd7rH8m4Z~DPKw85TPsEI1r~s~9Sa5nYLASY9mmv82ZJKd4zdcUdhMSLeBul0VfcC0tN6jivjF4a9BEl8LrigNOxOB4QfzG60vzj0~hitp~jycMVfPnigcvOlG3eeGzBviPLawuoBolORuT7R0O-jnkAPjjX8zFf5x4MG98k594709tX1~deOuNbFtR6i-PMlMQ__"
              class="img-fluid rounded"
              alt="Khuyến mãi 3"
            />
            <p class="mt-2 fw-bold style=" style="color: black">
              Happy Day - Vé chỉ từ 50k
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="blue-bar flex w-full h-[300px] p-4">
    <div class="container text-center">
      <div class="row">
        <div class="col-sm-8 move-left "><img src="https://viettelmoney.vn/wp-content/uploads/2023/01/GALAXY1.jpg"></div>
        <div class="col-sm-4">
          <h1 class="text-3xl text-white mb-4">Đặt Vé Online - Không Lo Trễ Nải</h1>
          <p class="text-sm text-white mb-5">
            Ghét đông đúc ồn ào? Lười xếp hàng mua vé? Hãy quên đi cách mua vé giấy truyền
            thống tốn thời gian hay xếp hàng lấy vé online phiền toái.
          </p>
          <div class="container px-4 text-center">
            <div class="row">
              <div class="col">
                <div class="p-3"><img src="https://www.galaxycine.vn/_next/static/media/glx-qr-code-1.218ae7da.svg"></div>
              </div>
              <div class="col">
                <div class="p-3"><img src="https://www.galaxycine.vn/_next/static/media/icon-ios-app-store.65ed00df.svg"></div>
                <div class="p-3"><img src="https://www.galaxycine.vn/_next/static/media/icon-google-app-store.f4c38402.svg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      movies: [],
      loading: true,
      error: null,
      images: [
        "https://cdn.galaxycine.vn/media/2025/2/26/2048_1740556419688.jpg",
        "https://cdn.galaxycine.vn/media/2025/2/10/captambravenewworld-2048_1739183619915.jpg",
        "https://cdn.galaxycine.vn/media/2025/2/17/nha-gia-tien-2048_1739775223178.jpg",
        "https://cdn.galaxycine.vn/media/2024/12/31/samsung--2_1735640530505.jpg",
      ],
      currentIndex: 0,
      interval: null,
    };
  },
  methods: {
    // Gọi API lấy danh sách phim
    async fetchMovies() {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/auth/movie/all");
        this.movies = response.data;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        this.error = "Không thể tải phim.";
      } finally {
        this.loading = false;
      }
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prevSlide() {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    startAutoSlide() {
      this.interval = setInterval(this.nextSlide, 2000); // Chuyển ảnh mỗi 3 giây
    },
    stopAutoSlide() {
      clearInterval(this.interval);
    },
  },
  mounted() {
    this.startAutoSlide(); // Bắt đầu tự động chạy khi component được tạo
  },
  beforeUnmount() {
    this.stopAutoSlide(); // Dừng chạy khi component bị hủy
  },
  mounted() {
    this.startAutoSlide();
    this.fetchMovies();
  },
};
</script>
<style scoped>
.box {
  border-radius: 8px;
  background: #fffafa;
  transition: transform 0.3s ease-in-out;
}

.box:hover {
  transform: scale(1.05);
}
.blue-bar {
  width: 100%;
  height: 450px;
  background-color: rgb(1, 1, 61);
}
.blue-bar {
  background-color: #002244; /* Nền xanh đậm */
  background-image: linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px);
  background-size: 30px 30px; /* Kích thước ô rô */
  padding: 20px;
}
.move-left {
  margin-left: -160px; /* Di chuyển trái 50px */
}
.line-default {
  width: 100%;

  border-top: 5px solid #d8d8d8; /* Độ dày và màu sắc của gạch */
  margin: 50px 0; /* Khoảng cách trên dưới */
}
.title-container {
  display: flex;
  align-items: center;
}

.line {
  width: 4px;
  height: 20px;
  background-color: blue;
  margin-right: 8px;
}

.title-text {
  font-weight: bold;
  color: black;
}
.line-default {
  width: 100%;
  border-top: 2px solid #ccc; /* Độ dày và màu sắc của gạch */
  margin: 20px 0; /* Khoảng cách trên dưới */
}
</style>
