import { API_URL } from "./common";

const commonnURL = API_URL;

export const login = async (email, password) => {
  const url = `${commonnURL}login`;
  const body = JSON.stringify({ email, password });

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    // Handle API error
    if (!res.ok) {
      let errorMessage = res.statusText;

      try {
        const errBody = await res.json();
        errorMessage = errBody?.message || res.statusText;
      } catch {}

      return {
        error: true,
        statusCode: res.status,
        statusText: errorMessage,
        message: "Имэйл эсвэл нууц үг буруу байна.",
      };
    }

    // Success
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);

    return {
      error: true,
      statusCode: 0,
      statusText: error?.message || "Network error",
      message: "Нэвтрэх үед алдаа гарлаа.",
    };
  }
};
