<template>
  <Teleport to="body">
    <div v-if="modalStore.isRegisterModalOpen" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-content">
          <img
            class="modal-logo"
            src="https://i.pinimg.com/736x/c4/3e/d8/c43ed885734d3c096da487320dc15694.jpg"
          />
          <button class="close-btn" @click="modalStore.closeRegisterModal">
            &times;
          </button>
          <h5>Đăng Ký Tài Khoản</h5>
          <form @submit.prevent="handleRegister">
            <div class="input-group">
              <input type="text" v-model="full_name" placeholder="Họ và Tên" required />
            </div>
            <div class="input-group">
              <input type="email" v-model="email" placeholder="Email" required />
            </div>
            <div class="input-group">
              <input type="text" v-model="phoneNumber" placeholder="Số điện thoại" required />
            </div>
            <div class="input-group">
              <select v-model="gender" required>
                <option value="male" disabled selected>Giới tính</option>
                <option value="1">Nam</option>
                <option value="2">Nữ</option>
              </select>
            </div>
            <div class="input-group">
              <input type="date" v-model="birthday" required />
            </div>
            <div class="input-group">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="Mật khẩu"
                required
              />
              <span class="toggle-password" @click="togglePassword(1)">
                {{ showPassword ? "👁️" : "🙈" }}
              </span>
            </div>

            <div class="input-group">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                required
              />
              <span class="toggle-password" @click="togglePassword(2)">
                {{ showConfirmPassword ? "👁️" : "🙈" }}
              </span>
            </div>
            <button type="submit" class="btn-submit">Hoàn Thành</button>
          </form>
          <p>Bạn đã có tài khoản? <a href="#" @click="switchToLogin">Đăng nhập</a></p>
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
const fullName = ref("");
const email = ref("");
const phoneNumber = ref("");
const gender = ref("");
const birthday = ref("");
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);

// Thêm biến kiểm soát hiển thị mật khẩu
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const handleRegister = async () => {
  console.log("Ngày sinh gửi đi:", birthday.value);
  if (password.value !== confirmPassword.value) {
    alert("Mật khẩu không khớp!");
    return;
  }

  loading.value = true;
  try {
    await axios.post("http://localhost:8080/api/v1/auth/register-user", {
      fullName: fullName.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      gender: gender.value === "male" ? 1 : 2,
      birthday: birthday.value, 
      password: password.value,
    });
    alert("Đăng ký thành công! Vui lòng đăng nhập.");
    modalStore.closeRegisterModal();
    modalStore.openLoginModal();
  } catch (error) {
    console.error("Lỗi đăng ký:", error.response?.data || error.message);
    alert("Đăng ký thất bại! Vui lòng thử lại.");
  } finally {
    loading.value = false;
  }
};

const switchToLogin = () => {
  modalStore.closeRegisterModal();
  modalStore.openLoginModal();
};

// Hàm toggle mật khẩu
const togglePassword = (field) => {
  if (field === 1) {
    showPassword.value = !showPassword.value;
  } else if (field === 2) {
    showConfirmPassword.value = !showConfirmPassword.value;
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  background: white;
  padding: 30px;
  border-radius: 10px;
  min-width: 350px;
  position: relative;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.modal-content {
  text-align: center;
}

.modal-logo {
  width: 80px;
  height: 80px;
  margin: 0 auto 10px;
  display: block;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
}

h5 {
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
}

.input-group {
  margin-bottom: 15px;
}

.input-group input,
.input-group select {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;
}

.input-group input:focus,
.input-group select:focus {
  border-color: #007bff;
}

.btn-submit {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background: #ff5638;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-submit:hover {
  background: #009200;
}

p {
  margin-top: 10px;
  font-size: 14px;
}

p a {
  color: #007bff;
  cursor: pointer;
  text-decoration: none;
}

p a:hover {
  text-decoration: underline;
}
.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-group input {
  width: 100%;
  padding-right: 40px;
}

.toggle-password {
  position: absolute;
  right: 10px;
  cursor: pointer;
  font-size: 18px;
  user-select: none;
}
</style>
