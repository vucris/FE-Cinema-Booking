import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modalStore", () => {
  const isLoginModalOpen = ref(false);
  const isRegisterModalOpen = ref(false);
  const isAuthenticated = ref(false);
  const userInfo = ref(null);

  // Đọc dữ liệu từ localStorage ngay khi store khởi tạo
  const savedUser = localStorage.getItem("userInfo");
  if (savedUser) {
    userInfo.value = JSON.parse(savedUser);
    isAuthenticated.value = true;
  }

  const openLoginModal = () => {
    isLoginModalOpen.value = true;
  };
  const closeLoginModal = () => {
    isLoginModalOpen.value = false;
  };

  const openRegisterModal = () => {
    isRegisterModalOpen.value = true;
  };
  const closeRegisterModal = () => {
    isRegisterModalOpen.value = false;
  };

  // Khi login thành công
  const setUser = (data) => {
    userInfo.value = data;
    isAuthenticated.value = true;
    localStorage.setItem("userInfo", JSON.stringify(data));
  };

  const logout = () => {
    userInfo.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem("userInfo");
  };

  return {
    isLoginModalOpen,
    isRegisterModalOpen,
    isAuthenticated,
    userInfo,
    openLoginModal,
    closeLoginModal,
    openRegisterModal,
    closeRegisterModal,
    setUser,
    logout,
  };
});
