<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-content">
      <button class="close-btn" @click="$emit('close')">✖</button>
      <slot></slot>
      <div class="modal-actions">
        <button class="confirm-btn" @click="$emit('confirm')">Thanh Toán</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
  },
  emits: ["close", "confirm"],
};
</script>

<style scoped>
/* Overlay nền tối */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* Modal Box */
.modal-content {
  background: white;
  width: 360px;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  position: relative;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

/* Nút đóng */
.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
  color: #555;
}

/* Nút Thanh Toán */
.confirm-btn {
  width: 100%;
  background: #ff5500;
  color: white;
  border: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.confirm-btn:hover {
  background: #e64a19;
}

/* Tạo khoảng cách cho phần action */
.modal-actions {
  margin-top: 15px;
}
</style>
