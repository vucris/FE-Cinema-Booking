<template>
  <div class="register-container">
    <h2>Đăng ký Admin</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="name">Họ và Tên</label>
        <input type="text" id="name" v-model="admin.name" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="admin.email" required />
      </div>

      <div class="form-group">
        <label for="password">Mật khẩu</label>
        <input type="password" id="password" v-model="admin.password" required />
      </div>

      <div class="form-group">
        <label for="confirmPassword">Nhập lại mật khẩu</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="admin.confirmPassword"
          required
        />
      </div>

      <button type="submit">Đăng ký</button>
    </form>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      admin: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    register() {
      if (this.admin.password !== this.admin.confirmPassword) {
        Swal.fire("Lỗi", "Mật khẩu nhập lại không khớp!", "error");
        return;
      }

      // Gửi dữ liệu lên API backend
      fetch("http://localhost:8080/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.admin.name,
          email: this.admin.email,
          password: this.admin.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            Swal.fire("Thành công", "Đăng ký thành công!", "success");
            this.admin = { name: "", email: "", password: "", confirmPassword: "" };
          } else {
            Swal.fire("Lỗi", data.message, "error");
          }
        })
        .catch((error) => {
          Swal.fire("Lỗi", "Đã có lỗi xảy ra!", "error");
          console.error("Lỗi:", error);
        });
    },
  },
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
}

h2 {
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #218838;
}
</style>
