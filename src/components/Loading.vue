<template>
  <div v-if="isLoading" class="loading-fullscreen">
    <svg class="spinner-svg" viewBox="0 0 50 50">
      <circle
        class="spinner-path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
      ></circle>
    </svg>
    <p>Đang xử lý, vui lòng chờ...</p>
  </div>
</template>

<script setup>
import { inject } from "vue";
const isLoading = inject("isLoading"); // Nhận trạng thái loading từ provide
</script>

<style scoped>
.loading-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 20px;
  font-weight: bold;
  z-index: 9999;
}

.spinner-svg {
  width: 80px;
  height: 80px;
  animation: rotate 1.5s linear infinite;
}

.spinner-path {
  stroke: #ff6600;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -125;
  }
}
</style>
