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
              src="https://s3-alpha-sig.figma.com/img/4e8c/8dc8/8add2c46d8d841bd17d2f07cd5aac453?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VSQeO9cBXfwrNBQaKGAUm3DmvTZe2kLgVvjOxrvHcp4yQUel~cHsWwmql3Nlq2ddesAEcTSWTk-V8aDjPl1HU14SzcnYyXqdfIMpJQC5Aqc5F6yHXoIiL5hgzDl0wgTpYoOE9LHpQ1MfnZzEUMKKTPSyW6rU5nr6cwAp2WrcCFbzdkOkjHOJpLZkdPWYTxG97WpJyXNNwYw5UJAxOjpwlQCSOTc1QpmNIxMWW1HIcd9B9qpGsAmaNyso5RD1F2eAkRTZFTR0fdku17UseETD~67Cs3EDa4m1uumQw7E0N9fFKrT315l8KN-gauDcMHum0Yqjwa2VkWKGHeTJpFmbJw__"
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
              src="https://s3-alpha-sig.figma.com/img/4510/fb63/9ec93df2ae9ae012cf4aae21818a01d1?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=W0fuiZ7yx~qPXdmZdOiTzAx4ROaO8qhq60DKeI3suF6NI1WvBsH~CZkt1aXvgK1~~U1YqpKcGuVLpQI~U2npiiu75nTW~82rJaywIQgoDZrpUBNTNrRPoW3PymgJSqoYMNLUgQ1qphYbWWIWStl9fgzvyy3gRZS50wzvWaCkvVy5yvHoViuDdlmUs~RGpTwBtjPfDsbPIYHFS9wT0SxRc3o0R2JG8FIlJsOgj~HTO63IzOe10cO~1VbdPLP2N0xPGteQOc8JDXSDV1FBOsAEts~8weo6AKvUDqRG96cTOYT4-2hVSKqsJid6qBzti9vgg95O3syzviVipoAvbDEZgA__"
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
              src="https://s3-alpha-sig.figma.com/img/b757/dd92/a71b8ccbea17a5744a6f9dad0bcdfba3?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hEwO37jJqSnEzRMg4NOqkecWykt5w8rNGY83LkEM8i2mJi3BSZ58URspLGdY1DHtLR-WNHxAcxXrACJ4VDJSEf9Fvi43dmE3mR8bslCTrpEC26K9~VavD-8C93ZP8CaObUc1RdOvJ9ECRYmjwpgaR66Pv9mc1uxkplW8VpSeaYQDxKdzQFAWySSHJUnNqCyhW3xIONCyhOotpC1156RX79QVrLOagL-U9o6-NsOzDNiuXlARM8oF9Yys2bU-rDxFbVaAl8ZgtF4qMv2JDWYRz9PvtX8pAYLUGUC3YA0d-x1~pRnAmyBkDG3rYR5L47cvpwHU5Do7dxWz0AFbiYR~Mg__"
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
        "https://cdn.galaxycine.vn/media/2025/2/3/shopee-pay-2_1738565481057.jpg",
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
