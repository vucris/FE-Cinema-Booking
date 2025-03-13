<template>
  <div id="app">
    <Loading v-if="isLoading" />

    <!-- Nếu KHÔNG PHẢI trang Admin thì mới hiển thị Header/Footer -->
    <template v-if="!isAdminPage">
      <Header />
      <LoginModal />
      <History />
      <Register />
    </template>

    <router-view />

    <!-- Footer chỉ hiển thị khi KHÔNG PHẢI trang Admin -->
    <Footer v-if="!isAdminPage" />
  </div>
</template>

<script>
import { ref, provide, watchEffect, computed } from "vue";
import { useRoute } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import LoginModal from "./views/login/login.vue";
import Register from "./views/login/register.vue";
import History from "./views/user/History.vue";
import Loading from "./components/Loading.vue"; // Import spinner loading

export default {
  name: "App",
  components: {
    Header,
    Footer,
    LoginModal,
    Register,
    History,
    Loading,
  },
  setup() {
    const isLoading = ref(false);
    provide("isLoading", isLoading); // Cung cấp trạng thái loading toàn app

    const route = useRoute();

    // Kiểm tra xem có phải trang Admin không
    const isAdminPage = computed(() => route.path.startsWith("/admin"));

    watchEffect(() => {
      isLoading.value = true; // Hiện loading khi chuyển trang
      setTimeout(() => {
        isLoading.value = false; // Ẩn loading sau 1.5 giây
      }, 1500);
    });

    return { isLoading, isAdminPage };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 0px;
}
</style>
