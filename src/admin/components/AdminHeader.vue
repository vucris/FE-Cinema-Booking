<template>
  <header class="admin-header">
    <div class="logo">
      <h2>Admin Cinema Booking</h2>
    </div>
    <div class="search-bar">
      <input type="text" placeholder="Tìm kiếm..." v-model="searchQuery" />
    </div>
    <div class="actions">
      <div class="user-menu" @click="toggleDropdown">
        <i class="fas fa-user-circle"></i>
        <div v-if="dropdownOpen" class="dropdown-menu">
          <button @click="logout">Đăng Xuất</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      dropdownOpen: false,
    };
  },
  methods: {
    logout() {
      alert("Đăng xuất thành công!");
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
  },
};
</script>

<style scoped>
.admin-header {
  background: #212020;
  color: white;
  padding: 9px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.admin-header .logo h2 {
  margin: 0;
  font-size: 24px;
}

.search-bar {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
}

.search-bar input {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
  width: 200px;
}

.actions {
  display: flex;
  align-items: center;
}

.user-menu {
  position: relative;
  cursor: pointer;
  font-size: 24px;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 35px;
  background: white;
  color: black;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  min-width: 120px;
}

.dropdown-menu button {
  background: none;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  font-size: 16px;
}

.dropdown-menu button:hover {
  background: #f0f0f0;
}
</style>