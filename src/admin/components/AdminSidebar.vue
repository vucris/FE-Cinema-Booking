<template>
  <nav class="admin-sidebar">
    <div class="logo">
      <div class="admin-info">
      <i class="fas fa-user-circle"></i>
      <span v-if="adminInfo">{{ adminInfo.email }}</span>
    </div>
    </div>
    <ul>
      <li>
        <router-link to="/admin/dashboard">
          <i class="fas fa-tachometer-alt"></i>
          Dashboard
        </router-link>
      </li>
      <li>
        <router-link to="/admin/movie">
          <i class="fas fa-film"></i>
          Quản lý Phim
        </router-link>
      </li>
      <li>
        <router-link to="/admin/users">
          <i class="fas fa-users"></i>
          Quản lý Người dùng
        </router-link>
      </li>
      <li>
        <router-link to="/admin/settings">
          <i class="fas fa-cog"></i>
          Cài đặt
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import "@fortawesome/fontawesome-free/css/all.min.css";
const adminInfo = ref(null);
onMounted(() => {
  const storedAdmin = localStorage.getItem("adminInfo");
  if (storedAdmin) {
    adminInfo.value = JSON.parse(storedAdmin);
  }
});
</script>

<style scoped>
.admin-sidebar {
  width: 260px;
  background: #212529;
  color: white;
  padding: 20px;
  min-height: 100vh;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.logo {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-weight: bold;
}

/* Phần hiển thị email admin */
.admin-info {
  display: flex;
  align-items: center;
  background: #343a40;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
}

.admin-info i {
  margin-right: 8px;
  font-size: 18px;
}

.admin-sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.admin-sidebar li {
  margin-bottom: 10px;
}

.admin-sidebar a {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border-radius: 8px;
  transition: background 0.3s ease, transform 0.2s ease;
  font-size: 1rem;
}

.admin-sidebar a i {
  margin-right: 10px;
  font-size: 1.2rem;
}

.admin-sidebar a:hover {
  background: #495057;
  transform: translateX(5px);
}

.admin-sidebar a.router-link-active {
  background: #007bff;
  color: white;
  font-weight: bold;
}
</style>
