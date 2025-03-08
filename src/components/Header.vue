<template>
  <header class="header container-fluid">
    <div class="row align-items-center w-100">
      <!-- Cột Logo + Nút Mua Vé -->
      <div class="col-4 d-flex align-items-center justify-content-start">
        <button class="logo" @click="goToHome">
          <img
            src="https://www.galaxycine.vn/_next/static/media/galaxy-logo-mobile.074abeac.png"
            alt="Galaxy Cinema"
          />
        </button>
        <button class="ticket-button" @click="goToHome">
          <img
            src="https://www.galaxycine.vn/_next/static/media/btn-ticket.42d72c96.webp"
            style="height: 40px; width: 100px"
          />
        </button>
      </div>

      <!-- Cột Thanh Điều Hướng -->
      <div class="col-4 d-flex justify-content-center">
        <nav class="nav">
          <div
            class="nav-item"
            @mouseover="showDropdown('movies')"
            @mouseleave="hideDropdown"
          >
            <span>Phim</span>
            <div v-if="activeDropdown === 'movies'" class="dropdown">
              <a href="#">Phim Đang Chiếu</a>
              <a href="#">Phim Sắp Chiếu</a>
            </div>
          </div>

          <div
            class="nav-item"
            @mouseover="showDropdown('cinema_corner')"
            @mouseleave="hideDropdown"
          >
            <span>Góc Điện Ảnh</span>
            <div v-if="activeDropdown === 'cinema_corner'" class="dropdown">
              <a href="#">Bình Luận Phim</a>
              <a href="#">Blog Điện Ảnh</a>
              <a href="#">Diễn Viên</a>
              <a href="#">Đạo Diễn</a>
            </div>
          </div>

          <div
            class="nav-item"
            @mouseover="showDropdown('events')"
            @mouseleave="hideDropdown"
          >
            <span>Sự Kiện</span>
            <div v-if="activeDropdown === 'events'" class="dropdown">
              <a href="#">Ưu Đãi</a>
              <a href="#">Sự Kiện Đặc Biệt</a>
            </div>
          </div>

          <div
            class="nav-item"
            @mouseover="showDropdown('cinema_prices')"
            @mouseleave="hideDropdown"
          >
            <span>Rạp/Giá Vé</span>
            <div v-if="activeDropdown === 'cinema_prices'" class="dropdown">
              <a href="#">Hệ Thống Rạp</a>
              <a href="#">Giá Vé</a>
            </div>
          </div>
        </nav>
      </div>

      <!-- Cột Đăng Nhập & Menu -->
      <!-- Cột Đăng Nhập & Menu -->
      <!-- Cột Đăng Nhập & Menu -->
      <div class="col-4 d-flex justify-content-end align-items-center">
        <button
          v-if="!modalStore.isAuthenticated"
          class="login"
          @click="modalStore.openLoginModal"
        >
          <span class="icon">👤</span> Đăng Nhập
        </button>
        <!-- Nếu đã đăng nhập -->
        <div v-else class="col-4 d-flex justify-content-end align-items-center">
          <button
            class="btn btn-light dropdown-toggle"
            type="button"
            id="dropdownUser"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span class="icon">👤</span> {{ modalStore.userInfo?.email }}
          </button>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUser">
            <router-link
              to="/user/infoUser"
              class="dropdown-item d-flex align-items-center text-start"
            >
              <i class="bi bi-person-badge me-2"></i> Thông tin tài khoản
            </router-link>
            <router-link
            to="/user/History"
              class="dropdown-item d-flex align-items-center text-start" href="#">
                <i class="bi bi-blockquote-right me-2"></i> Lịch sử giao dịch
            </router-link>
            <li>
              <button
                class="dropdown-item d-flex align-items-center text-start text-danger"
                @click="handleLogout"
              >
                <i class="bi bi-box-arrow-left me-2"></i>
                Đăng xuất
              </button>
            </li>
          </ul>
        </div>
        <!-- Nút menu hamburger -->
        <button class="hamburger">☰</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useModalStore } from "@/stores/modalStore";
import { ref } from "vue";
import { useRouter } from "vue-router";
// 🛠 Chỉ gọi useModalStore() một lần
const router = useRouter();

const modalStore = useModalStore();
// Hàm mở modal
const openLoginModal = () => {
  modalStore.openLoginModal();
};

// Quản lý dropdown
const activeDropdown = ref(null);
const showDropdown = (menu) => {
  activeDropdown.value = menu;
};
const hideDropdown = () => {
  activeDropdown.value = null;
};

const handleLogout = () => {
  modalStore.logout();
};
// Hàm chuyển về trang chủ
const goToHome = () => {
  router.push("/");
};
</script>

<style scoped>
/* Header */
.header {
  background-color: white;
  padding: 10px 20px;
  border-bottom: 2px solid #ddd;
  position: relative;
  z-index: 1000;
}

/* Layout Chia Cột */
.row {
  width: 100%;
}

/* Logo */
.logo img {
  height: 40px;
}

/* Ticket Button */
.logo {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 15px;
}
/* Ticket Button */
.ticket-button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 15px;
}

/* Navigation */
.nav {
  display: flex;
  gap: 20px;
}

.nav-item {
  position: relative;
  cursor: pointer;
  padding: 10px;
}

/* Dropdown */
.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  color: black;
  min-width: 150px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  padding: 10px 0;
  border: 1px solid #ddd;
  z-index: 2000;
}

.dropdown a {
  display: block;
  padding: 8px 15px;
  color: black;
  text-decoration: none;
}

.dropdown a:hover {
  background: #f0f0f0;
}

/* Menu */
.menu {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Nút đăng nhập */
.login,
.logout {
  background-color: #f60;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}

/* User Info */
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Icon */
.icon {
  margin-right: 5px;
}

/* Nút menu */
.hamburger {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
/* Hiệu ứng rung */
/* Hover vào dropdown-item */
.dropdown-item:hover {
  background-color: orange !important;
  color: white !important;
  animation: shake 0.3s ease-in-out;
}
</style>
