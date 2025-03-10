import axios from "axios";
const API_URL = "http://localhost:8080/api/v1/customer";
// Lấy token từ localStorage
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const token = userInfo?.token || "";
// Lấy danh sách vé theo customerId
export const getTicketsByCustomer = async (customerId) => {
  try {
    const response = await axios.get(`${API_URL}/all-ticket/${customerId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Gửi token để xác thực
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy lịch sử đặt vé:", error);
    throw error;
  }
};
export const cancelTicket = async (ticketId) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token || "";
  
    try {
      const response = await axios.put(
        `${API_URL}/cancel-ticket/${ticketId}`,
        {}, // 🛠 Thêm body rỗng nếu API không yêu cầu payload
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi khi hủy vé:", error);
      throw error;
    }
  };
  