<template>
  <div class="profile-wrapper">
    <div class="profile-container">
      <div class="row">
        <!-- Cột Avatar -->
        <div class="col-md-4">
          <div class="card user-card shadow-sm">
            <div class="card-body text-center">
              <img
                src="https://i.pinimg.com/736x/4e/22/be/4e22beef6d94640c45a1b15f4a158b23.jpg"
                alt="User Avatar"
                class="rounded-circle avatar"
              />
              <h5 class="mt-3">Tên người dùng</h5>
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
        <!-- Khoảng trống giữa 2 cột -->
        <div class="col-md-1"></div>

        <!-- Cột Form thông tin cá nhân -->
        <div class="col-md-7">
          <div class="card shadow-sm user-info-card">
            <div class="card-body">
              <ul class="nav nav-tabs">
                <li class="nav-item">
                  <a class="nav-link active fw-bold" style="color: coral" href="#"
                    >Thông Tin Cá Nhân</a
                  >
                </li>
              </ul>
              <div class="mt-3">
                <div class="row">
                  <div class="col-6 mb-3">
                    <label class="form-label">Họ và tên</label>
                    <div class="input-group">
                      <span class="input-group-text">
                        <i class="bi bi-person-fill"></i>
                      </span>
                      <input
                        type="text"
                        class="form-control"
                        value="Nguyễn Văn A"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-6 mb-3">
                    <label class="form-label">Email</label>
                    
                    <input
                      type="email"
                      class="form-control"
                      value="email@example.com"
                      disabled
                    />
                  </div>
                  <div class="col-6 mb-3">
                    <label class="form-label">Ngày sinh</label>
                    <input type="date" class="form-control" value="2000-01-01" disabled />
                  </div>
                  <div class="col-6 mb-3">
                    <label class="form-label">Số điện thoại</label>
                    <input type="text" class="form-control" value="0123456789" disabled />
                  </div>
                  <div class="col-6 mb-3">
                    <label class="form-label">Giới tính</label>
                    <div class="d-flex">
                      <input type="radio" name="gender" class="me-2" checked disabled />
                      Nam
                      <input type="radio" name="gender" class="ms-3 me-2" disabled /> Nữ
                    </div>
                  </div>
                  <div class="col-6 mb-3">
                    <label class="form-label">Mật khẩu</label>
                    <input
                      type="password"
                      class="form-control"
                      value="********"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- Nút Cập nhật xuống cuối -->
            <div class="mt-4 text-right">
              <button class="btn-update">Cập nhật</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
  display: flex;
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
