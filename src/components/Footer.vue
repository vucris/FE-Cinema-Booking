<template>
  <footer class="footer-container">
    <div class="container">
      <div class="row">
        <!-- Cột 1: Giới thiệu -->
        <div class="col-md-3">
          <h6 class="footer-title">GIỚI THIỆU</h6>
          <ul class="footer-links">
            <li>Về Chúng Tôi</li>
            <li>Thỏa Thuận Sử Dụng</li>
            <li>Quy Chế Hoạt Động</li>
            <li>Chính Sách Bảo Mật</li>
          </ul>
        </div>

        <!-- Cột 2: Góc điện ảnh -->
        <div class="col-md-3">
          <h6 class="footer-title">GÓC ĐIỆN ẢNH</h6>
          <ul class="footer-links">
            <li>Thể Loại Phim</li>
            <li>Bình Luận Phim</li>
            <li>Blog Điện Ảnh</li>
            <li>Phim Hay Tháng</li>
            <li>Phim IMAX</li>
          </ul>
        </div>

        <!-- Cột 3: Hỗ trợ -->
        <div class="col-md-3">
          <h6 class="footer-title">HỖ TRỢ</h6>
          <ul class="footer-links">
            <li>Góp Ý</li>
            <li>Sale & Services</li>
            <li>Rạp / Giá Vé</li>
            <li>Tuyển Dụng</li>
            <li>FAQ</li>
          </ul>
        </div>

        <!-- Cột 4: Logo + MXH + Chứng nhận -->
        <div class="col-md-3 text-end">
          <img
            src="https://www.galaxycine.vn/media/2024/11/11/glx-footer.svg"
            alt="Galaxy Cinema"
            class="footer-logo mb-2"
          />
          <div class="social-icons mb-2">
            <i class="bi bi-facebook"></i>
            <i class="bi bi-youtube mx-3"></i>
            <i class="bi bi-instagram"></i>
          </div>
          <img
            src="https://www.galaxycine.vn/static/media/da-thong-bao.37dc16c1.png"
            alt="Đã thông báo"
            class="footer-certification"
          />
        </div>
      </div>

      <hr class="footer-divider" />

      <!-- Thông tin công ty -->
      <div class="text-center company-info">
        <p class="mb-1">CÔNG TY CỔ PHẦN PHIM VU CRIS</p>
        <p>
          Đà Nẵng
        </p>
        <p>📞0826 594 590 - ⏰ 8:00 - 22:00 - 7/7</p>
      </div>
    </div>
  </footer>
</template>
<style scoped>
.footer-container {
  background-color: #333;
  color: #ccc;
  padding: 30px 0;
}

.footer-title {
  color: #fff;
  font-weight: bold;
  margin-bottom: 15px;
  font-size: 16px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 8px;
  font-size: 14px;
  cursor: pointer;
}

.footer-links li:hover {
  color: #fff;
}

.footer-logo {
  width: 100px;
}

.social-icons i {
  font-size: 24px;
  cursor: pointer;
}

.footer-certification {
  width: 80px;
}

.footer-divider {
  border-top: 1px solid #555;
  margin: 20px 0;
}

.company-info p {
  font-size: 14px;
  margin: 0;
}
</style>
