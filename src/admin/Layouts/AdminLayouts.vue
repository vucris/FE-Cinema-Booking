<template>
  <div class="admin-container">
    <!-- Header -->
    <AdminHeader />

    <div class="admin-content">
      <!-- Sidebar -->
      <AdminSidebar />

      <!-- Nội dung chính -->
      <div class="admin-main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import AdminHeader from "@/admin/components/AdminHeader.vue";
import AdminSidebar from "@/admin/components/AdminSidebar.vue";

export default {
  components: {
    AdminHeader,
    AdminSidebar,
  },
};
</script>

<style scoped>
.admin-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.admin-content {
  display: flex;
  flex: 1;
}

.admin-main {
  flex: 1;
  padding: 20px;
  background: #f8f9fa;
}
</style>
