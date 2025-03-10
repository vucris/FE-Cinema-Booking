<template>
  <div class="profile-wrapper">
    <div class="profile-container">
      <div class="row">
        <!-- Cột Avatar -->
        <div class="col-md-3">
          <div class="card user-card shadow-sm">
            <div class="card-body text-center">
              <img
                src="https://i.pinimg.com/736x/4e/22/be/4e22beef6d94640c45a1b15f4a158b23.jpg"
                alt="User Avatar"
                class="rounded-circle avatar"
              />
              <h5 class="mt-3">{{ user.fullName }}</h5>
              <p class="text-muted">🌟 0 Stars</p>
              <hr />
              <div class="d-flex align-items-center">
                <b class="fw-bold me-2">HOTLINE hỗ trợ:</b>
                <p class="text-primary fw-bold mb-0">0826 594 590</p>
              </div>
              <div class="d-flex align-items-center">
                <b class="fw-bold me-2">Email: </b>
                <p class="text-primary fw-bold mb-0">Longvu@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Cột Form thông tin cá nhân -->
        <div class="col-md-9">
          <div class="card shadow-sm user-info-card">
            <div class="card-body">
              <!-- Nav Tabs -->
              <ul class="nav nav-tabs">
                <li class="nav-item">
                  <a class="nav-link active fw-bold" data-bs-toggle="tab" href="#info">
                    Thông Tin Cá Nhân
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link fw-bold" data-bs-toggle="tab" href="#history">
                    Lịch Sử Đặt Vé
                  </a>
                </li>
              </ul>

              <!-- Nội dung của Tabs -->
              <div class="tab-content mt-3">
                <!-- Tab Thông Tin Cá Nhân -->
                <div class="tab-pane fade show active" id="info">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Họ và tên</label>
                      <input type="text" class="form-control" v-model="user.fullName" />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        v-model="user.email"
                        disabled
                      />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Ngày sinh</label>
                      <input
                        type="date"
                        class="form-control"
                        v-model="formattedBirthday"
                      />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Số điện thoại</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="user.phoneNumber"
                      />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Giới tính</label>
                      <div class="d-flex">
                        <input
                          type="radio"
                          v-model="user.gender"
                          :value="0"
                          class="me-2"
                        />
                        Nam
                        <input
                          type="radio"
                          v-model="user.gender"
                          :value="1"
                          class="ms-3 me-2"
                        />
                        Nữ
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Mật khẩu</label>
                      <input
                        type="password"
                        class="form-control"
                        value="********"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="mt-4 text-right">
                    <button class="btn-update" @click="updateProfile">Cập nhật</button>
                  </div>
                </div>

                <!-- Tab Lịch Sử Đặt Vé -->
                <div class="tab-pane fade" id="history">
                  <div class="table-responsive">
                    <table class="table table-bordered text-center">
                      <thead>
                        <tr>
                          <th style="width: 10%">Mã Vé</th>
                          <th style="width: 30%">Phim</th>
                          <th style="width: 15%">Ngày Chiếu</th>
                          <th style="width: 15%">Giờ Chiếu</th>
                          <th style="width: 15%">Ghế</th>
                          <th style="width: 15%">Tổng tiền</th>
                          <th style="width: 25%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="ticket in ticketHistory" :key="ticket.id">
                          <td>{{ ticket.id }}</td>
                          <td>{{ ticket.nameMovie }}</td>
                          <td>{{ ticket.showDate }}</td>
                          <td>{{ ticket.showtime }}</td>
                          <td>{{ ticket.nameChair || "Chưa có ghế" }}</td>
                          <td>{{ ticket.totalPrice.toLocaleString() }} VND</td>
                          <td>
                            <button
                              class="bg-danger"
                              @click="handleCancelTicket(ticket.id)"
                            >
                              Hủy vé
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <!-- Kết thúc tab-content -->
            </div>
          </div>
        </div>
        <!-- Kết thúc col-md-9 -->
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { ref, onMounted, computed, getCurrentInstance } from "vue";
import { getCustomerProfile, updateCustomerProfile } from "@/api/User/customer";
import { getTicketsByCustomer, cancelTicket } from "@/api/User/ticket";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    const instance = getCurrentInstance();
    const ticketHistory = ref([]); // Lấy instance của Vue
    const user = ref({
      fullName: "",
      email: "",
      birthday: "",
      phoneNumber: "",
      gender: null,
    });

    //  Kiểm tra và lấy thông tin user từ localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const customerId = userInfo?.userId || null;

    if (!customerId) {
      console.error("Không tìm thấy customerId!");
      return { user };
    }

    //  Fetch dữ liệu từ API khi component được mounted
    const fetchUserProfile = async () => {
      try {
        const data = await getCustomerProfile(customerId);
        user.value = { ...data };
      } catch (error) {
        console.error("Lỗi khi lấy thông tin khách hàng:", error);
      }
    };

    //  Format ngày sinh từ "dd-MM-yyyy" sang "yyyy-MM-dd" để hiển thị trong input type="date"
    const formattedBirthday = computed({
      get: () => {
        if (!user.value.birthday) return "";
        const parts = user.value.birthday.split("-");
        return `${parts[2]}-${parts[1]}-${parts[0]}`; // YYYY-MM-DD
      },
      set: (newValue) => {
        if (newValue) {
          const parts = newValue.split("-");
          user.value.birthday = `${parts[2]}-${parts[1]}-${parts[0]}`; // dd-MM-yyyy
        }
      },
    });

    //  Gửi request cập nhật thông tin
    const updateProfile = async () => {
      if (!instance) return; // Đảm bảo instance tồn tại
      const { proxy } = instance; // Truy cập proxy
      const result = await proxy.$swal.fire({
        title: "Xác nhận!",
        text: "Bạn có chắc muốn cập nhật thông tin?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
      });
      if (!result.isConfirmed) return; // Nếu nhấn "Hủy" thì không làm gì cả
      if (!/^\d{10}$/.test(user.value.phoneNumber)) {
        $showErrorAlert("Số điện thoại phải có đúng 10 chữ số!");
        return;
      }

      try {
        await updateCustomerProfile(customerId, {
          fullName: user.value.fullName,
          birthday: user.value.birthday, // Lúc này birthday đã được cập nhật từ input
          gender: user.value.gender,
          phoneNumber: user.value.phoneNumber,
        });
        proxy.$showSuccessAlert("Cập nhật thành công!");
      } catch (error) {
        proxy.$showErrorAlert("Có lỗi xảy ra! Vui lòng thử lại.");
      }
    };

    // Lấy lịch sử vé
    const fetchTicketHistory = async () => {
      try {
        const data = await getTicketsByCustomer(customerId);
        ticketHistory.value = data;
      } catch (error) {
        console.error("Lỗi khi lấy lịch sử vé:", error);
      }
    };
    // Hủy vé có xác nhận
    const handleCancelTicket = async (ticketId) => {
      const { value: isConfirmed } = await instance.proxy.$swal.fire({
        title: "Bạn có chắc chắn muốn hủy vé?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có, hủy vé!",
        cancelButtonText: "Không",
      });
      if (!isConfirmed) return;
      try {
        await cancelTicket(ticketId);
        instance.proxy.$showSuccessAlert("Hủy vé thành công!");
        await fetchTicketHistory();
      } catch (error) {
        instance.proxy.$showErrorAlert("Hủy vé thất bại!");
      }
    };
    onMounted(() => {
      fetchUserProfile();
      fetchTicketHistory();
    });
    return {
      user,
      formattedBirthday,
      updateProfile,
      ticketHistory,
      fetchTicketHistory,
      handleCancelTicket,
    };
  },
};
</script>
<style scoped>
/* Bọc ngoài giúp căn giữa nhưng không đẩy quá xa header */
.profile-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Giữ layout gần header */
  background: linear-gradient(135deg, #f8f9fa, #e3e8ef);
  padding: 50px 20px 20px; /* Chỉnh padding-top thay vì min-height */
  box-sizing: border-box;
}

/* Container chính giữa, có max-width */
.profile-container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto; /* Căn giữa */
}

.avatar {
  width: 120px; /* Kích thước cố định */
  height: 120px; /* Kích thước cố định */
  border-radius: 50%; /* Bo tròn ảnh */
  object-fit: cover; /* Giữ tỷ lệ ảnh và cắt nếu cần */
  object-position: center; /* Căn giữa ảnh */
  border: 4px solid #f0f0f0; /* Viền nhẹ */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Bóng nhẹ */
}

.avatar:hover {
  transform: scale(1.05); /* Hiệu ứng phóng to nhẹ khi hover */
}

/* Form Card */
.user-info-card {
  border: none;
  border-radius: 15px;
  display: 100%;
  flex-direction: column;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  background: white;
  padding: 20px;
}

/* Form input */
.form-control {
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  transition: all 0.3s ease-in-out;
}

/* Nút Cập nhật */
.btn-update {
  display: inline-block;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(45deg, #ff7b00, #ff5500);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 4px 10px rgba(255, 123, 0, 0.3);
  margin-top: 20px;
  width: 100%;
}

.btn-update:hover {
  background: linear-gradient(45deg, #ff5500, #e63b00);
  transform: translateY(-2px);
  box-shadow: 0px 6px 15px rgba(255, 85, 0, 0.4);
}

.btn-update:active {
  transform: scale(0.98);
  box-shadow: 0px 2px 8px rgba(255, 85, 0, 0.3);
}
</style>
