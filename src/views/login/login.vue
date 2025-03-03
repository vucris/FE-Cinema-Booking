<template>
  <Teleport to="body">
    <div v-if="modalStore.isLoginModalOpen" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-content">
          <img
            class="modal-logo"
            src="https://i.pinimg.com/736x/c4/3e/d8/c43ed885734d3c096da487320dc15694.jpg"
          />
          <button class="close-btn" @click="modalStore.closeLoginModal">&times;</button>
          <h5>Đăng Nhập Tài Khoản</h5>
          <form @submit.prevent="handleLogin">
            <div class="input-group">
              <input type="email" v-model="email" placeholder="Nhập Email" required />
            </div>
            <div class="input-group">
              <input
              style="margin-top: 22px;"
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="Mật khẩu"
                required
              />
              <span class="toggle-password" @click="togglePassword(1)">
                {{ showPassword ? "👁️" : "🙈" }}
              </span>
            </div>
            <button type="submit">Đăng Nhập</button>
          </form>
          <p><a href="#">Quên mật khẩu?</a></p>
          <p>
            Bạn chưa có tài khoản?
            <a href="#" @click.prevent="switchToRegister">Đăng ký</a>
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import { useModalStore } from "@/stores/modalStore";

const modalStore = useModalStore();
const email = ref("");
const password = ref("");
const loading = ref(false);
const showPassword = ref(false);
const handleLogin = async () => {
  loading.value = true;
  try {
    const response = await axios.post("http://localhost:8080/api/v1/auth/login", {
      email: email.value,
      password: password.value,
    });
    

    // API trả về { token, fullName }
    modalStore.setUser({
    userId: response.data.userId,
    email: response.data.email,   // <-- phải có email
    role: response.data.role,
    token: response.data.token
});

    alert("Đăng nhập thành công!");
    modalStore.closeLoginModal();
  } catch (error) {
    console.error("Lỗi đăng nhập:", error.response?.data || error.message);
    alert("Đăng nhập thất bại! Vui lòng kiểm tra lại tài khoản/mật khẩu.");
  } finally {
    loading.value = false;
  }
};

// Hàm chuyển sang modal đăng ký
const switchToRegister = () => {
  modalStore.closeLoginModal();
  modalStore.openRegisterModal();
};

// Hàm toggle hiển thị mật khẩu
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped>
.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-group input {
  width: 100%;
  padding-right: 90px; /* Chừa khoảng trống cho icon */
}

.toggle-password {
  position: absolute;
  right: 10px;
  cursor: pointer;
  top: 26px;
  font-size: 25px;
}
.input-group {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease-in-out;
}

/* Khi input được focus (click vào) */
.input-group input:focus {
  border-color: #0a9000;
  box-shadow: 0 0 5px rgba(0, 190, 19, 0.5);
}
</style>
