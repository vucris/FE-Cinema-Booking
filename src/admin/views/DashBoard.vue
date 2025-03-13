<template>
  <div class="admin-dashboard">
    <h1>📊 Admin Dashboard</h1>

    <!-- Thống kê tổng quan -->
    <div class="stats">
      <div class="stat-card">
        <i class="fas fa-film"></i>
        <div>
          <h3>{{ totalMovies }}</h3>
          <p>Tổng số phim</p>
        </div>
      </div>

      <div class="stat-card">
        <i class="fas fa-users"></i>
        <div>
          <h3>{{ totalUsers }}</h3>
          <p>Tổng số người dùng</p>
        </div>
      </div>

      <div class="stat-card">
        <i class="fas fa-ticket-alt"></i>
        <div>
          <h3>{{ totalTickets }}</h3>
          <p>Vé đã bán</p>
        </div>
      </div>

      <div class="stat-card">
        <i class="fas fa-dollar-sign"></i>
        <div>
          <h3>{{ revenue.toLocaleString() }} VNĐ</h3>
          <p>Doanh thu</p>
        </div>
      </div>
    </div>

    <!-- Biểu đồ -->
    <div class="charts">
      <div class="chart-card">
        <h2>📈 Biểu đồ doanh thu</h2>
        <BarChart :chartData="revenueData" />
      </div>

      <div class="chart-card">
        <h2>📊 Số lượng vé bán theo tháng</h2>
        <LineChart :chartData="ticketsData" />
      </div>
    </div>

    <!-- Danh sách đặt vé gần đây -->
    <div class="recent-orders">
      <h2>📝 Danh sách đặt vé gần đây</h2>
      <table>
        <thead>
          <tr>
            <th>Mã đặt vé</th>
            <th>Người đặt</th>
            <th>Phim</th>
            <th>Ghế</th>
            <th>Giá vé</th>
            <th>Ngày đặt</th>
            <th>Trạng Thái</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in recentOrders" :key="order.id">
            <td>#{{ order.id }}</td>
            <td>{{ order.user }}</td>
            <td>{{ order.movie }}</td>
            <td>{{ order.seat }}</td>
            <td>{{ order.price.toLocaleString() }} VNĐ</td>
            <td>{{ order.date }}</td>
            <td><button class="ghost-primary">đang hoạt động</button></td>
            <td class="action-icons">
            <i class="fa-solid fa-pen-to-square me-3"></i>
            <i class="fa-solid fa-trash me-3"></i>
            <i class="fa-solid fa-circle-info me-3"></i>
          </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { BarChart, LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

Chart.register(...registerables);

const totalMovies = ref(0);
const totalUsers = ref(0);
const totalTickets = ref(0);
const revenue = ref(0);
const recentOrders = ref([]);

// Dữ liệu biểu đồ doanh thu
const revenueData = ref({
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Doanh thu (VNĐ)",
      data: [50000000, 70000000, 60000000, 80000000, 90000000, 100000000],
      backgroundColor: "#ff5100",
    },
  ],
});

// Dữ liệu biểu đồ số vé bán
const ticketsData = ref({
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Số vé đã bán",
      data: [1000, 1200, 1500, 1800, 2000, 2500],
      borderColor: "#28a745",
      fill: false,
    },
  ],
});

onMounted(() => {
  totalMovies.value = 120;
  totalUsers.value = 4500;
  totalTickets.value = 8600;
  revenue.value = 235000000;

  recentOrders.value = [
    {
      id: 1,
      user: "Nguyễn Văn A",
      movie: "Avengers",
      seat: "A1, A2",
      price: 200000,
      date: "12/03/2025",
    },
    {
      id: 2,
      user: "Trần Thị B",
      movie: "Batman",
      seat: "B5, B6",
      price: 250000,
      date: "11/03/2025",
    },
    {
      id: 3,
      user: "Lê Văn C",
      movie: "Spider-Man",
      seat: "C3, C4",
      price: 180000,
      date: "10/03/2025",
    },
  ];
});
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
  background: #f8f9fa;
  min-height: 100vh;
}

h1 {
  font-size: 26px;
  color: #333;
  margin-bottom: 20px;
}

/* Thống kê */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 15px;
}

.stat-card i {
  font-size: 40px;
  color: #ff5100;
}

.stat-card h3 {
  font-size: 22px;
  margin: 0;
}

.stat-card p {
  color: #666;
  margin: 0;
}

/* Biểu đồ */
.charts {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.chart-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-width: 300px;
}

/* Danh sách đặt vé */
.recent-orders {
  background: rgb(194, 177, 177);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

h2 {
  margin-bottom: 15px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th,
table td {
  padding: 12px;
  border-bottom: 1px solid #000000;
  text-align: left;
}

table th {
  background: #914e39a5;
  color: white;
}

table tr:hover {
  background: #72f1cf;
}
* {
  color: black !important;
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
  display: flexbox;
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
