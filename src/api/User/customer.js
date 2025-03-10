import axios from "axios";
const API_URL = "http://localhost:8080/api/v1/customer";
// Lấy token từ localStorage
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const token = userInfo?.token || "";
export const getCustomerProfile = async (customerId) => {
  try {
    const response = await axios.get(`${API_URL}/profile/${customerId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Gửi token để xác thực
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin khách hàng:", error);
    throw error;
  }
};

export const updateCustomerProfile = async (customerId, updatedData) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token || "";
  try {
    const formData = new URLSearchParams(); // Dữ liệu dạng `x-www-form-urlencoded`
    formData.append("fullName", updatedData.fullName);
    formData.append("birthday", updatedData.birthday);
    formData.append("gender", updatedData.gender);
    formData.append("phoneNumber", updatedData.phoneNumber);
    const response = await axios.put(
      `http://localhost:8080/api/v1/customer/profile/${customerId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token để xác thực
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin khách hàng:", error);
    throw error;
  }
};
