import axios from "axios";

function axiosWithAuth() {
  const token = localStorage.getItem("token");

  return axios.create({
    baseUrl: `http://localhost:5000`,
    headers: {
      authorization: token
    }
  });
}
export default axiosWithAuth;