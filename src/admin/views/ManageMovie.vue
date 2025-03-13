<template>
  <div class="table-container">
    <div class="table-header">
      <h2>Danh Sách Phim</h2>
      <button class="add-movie-btn"> <i class="fa-solid fa-plus me-2"></i> Thêm mới phim</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">
            <input type="checkbox" @change="toggleAll" v-model="allSelected" />
          </th>
          <th scope="col">#</th>
          <th scope="col">Tên phim</th>
          <!-- <th scope="col">Mô tả phim</th> -->
          <th scope="col">Thời lượng</th>
          <th scope="col">Poster Phim</th>
          <th scope="col">Ngày chiếu</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(movie, index) in movies" :key="movie.id">
          <td><input type="checkbox" v-model="movie.selected" /></td>
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ movie.title || "" }}</td>
          <!-- <td>{{ movie.description || "" }}</td> -->
          <td>{{ movie.duration ? movie.duration + " phút" : "" }}</td>
          <td>
            <img
              v-if="movie.image"
              :src="movie.image"
              alt="Poster"
              width="80"
              height="90"
            />
          </td>
          <td>{{ movie.releaseDate || "" }}</td>
          <td>
            <button class="ghost-primary">đang hoạt động</button>
          </td>
          <td class="action-icons">
            <i class="fa-solid fa-pen-to-square"></i>
            <i class="fa-solid fa-trash"></i>
            <i class="fa-solid fa-circle-info"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const movies = ref([]); // danh sách phim
const allSelected = ref(false); // chọn tất cả\
// gọi api lấy danh sách phim
onMounted(async () => {
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo")) || null;
  if (!adminInfo || !adminInfo.token) {
    console.error("Không tìm thấy adminInfo hoặc token!");
    return;
  }
  try {
    const response = await axios.get("http://localhost:8080/api/v1/manager/movies", {
      headers: { Authorization: `Bearer ${adminInfo.token}` },
    });
    movies.value = response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phim:", error);
  }
});
// Hàm chọn tất cả checkbox
const toggleAll = () => {
  movies.value.forEach((movie) => (movie.selected = allSelected.value));
};
</script>

<style scoped>
.table-container {
  overflow-x: auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.table-header h2 {
  margin: 0;
  font-size: 22px;
  color: #333;
}

.add-movie-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
}

.add-movie-btn:hover {
  background: #0056b3;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 18px;
  text-align: left;
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.table thead tr {
  background: linear-gradient(135deg, #caa810, #0056b3);
  color: white;
  text-transform: uppercase;
  font-weight: bold;
}

.table th,
.table td {
  padding: 16px 20px;
  border-bottom: 1px solid #ddd;
}

.table tbody tr {
  transition: all 0.3s ease-in-out;
}

.table th,
.table td {
  padding: 16px 20px;
  border: 1px solid #ddd;
}
.table tbody tr:nth-child(even) {
  background-color: #f8f9fa;
}

.table tbody tr:hover {
  background-color: #e9f5ff;
  transform: scale(1.02);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.table tbody tr:last-child {
  border-bottom: 2px solid #007bff;
}

.edit-btn,
.delete-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 5px;
}

.edit-btn {
  background: #ffc107;
  color: #333;
}

.edit-btn:hover {
  background: #e0a800;
}

.delete-btn {
  background: #dc3545;
  color: white;
}

.delete-btn:hover {
  background: #c82333;
}
.ghost-primary {
  background-color: #4caf50; /* Màu xanh lá */
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  cursor: default;
  text-transform: uppercase;
}

/* Hover (nếu muốn nút có hiệu ứng khi di chuột vào) */
.ghost-primary:hover {
  background-color: #45a049;
}
/* Chỉnh khoảng cách giữa các icon */
.action-icons {
  display: flex;
  gap: 25px; /* Tăng khoảng cách giữa các icon */
}

/* Chỉnh icon to hơn, đẹp hơn */
.action-icons i {
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;
}

/* Màu sắc từng icon */
.fa-pen-to-square {
  color: #f39c12;
} /* Màu cam */
.fa-trash {
  color: #e74c3c;
} /* Màu đỏ */
.fa-circle-info {
  color: #3498db;
} /* Màu xanh dương */

/* Hover effect */
.fa-pen-to-square:hover {
  color: #e67e22;
  transform: scale(1.2);
}
.fa-trash:hover {
  color: #c0392b;
  transform: scale(1.2);
}
</style>
