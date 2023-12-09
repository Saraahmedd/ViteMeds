const axios = require("axios");
const { default: baseURL } = require("./baseURL");

export async function fetchData() {
  try {
    const { data } = await axios.get(`${baseURL}/api/v1/user/me`, {
      withCredentials: true,
    });
    return data.user.role;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
}
