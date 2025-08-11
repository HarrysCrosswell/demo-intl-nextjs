import { User, ApiResponse } from "@/types/user";

const API_BASE_URL = "http://localhost:8010"; // Spring Boot port

export const userApi = {
  async getUser(userId: string, locale: string): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Language": locale,
        //"Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        detail: data.detail || data.message || "An error occurred",
      };
    }

    console.log("FOUND USER: ", data);

    return data;
  },
};
