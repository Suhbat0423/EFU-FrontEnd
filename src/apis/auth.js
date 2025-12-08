import { API_URL } from "./common";

export const login = async (email, password) => {
  const url = `${API_URL}login`;
  const body = JSON.stringify({ email, password });

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (!res.ok) {
      return {
        error: true,
        statusCode: res.status,
        statusText:
          (await (async () => {
            try {
              const errBody = await res.json();
              return errBody?.message || res.statusText;
            } catch {
              return res.statusText;
            }
          })()) || "",
        message: "Имэйл эсвэл нууц үг буруу байна.",
      };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    // Return a structured error; caller can decide how to display
    return {
      error: true,
      statusCode: 0,
      statusText: (error && error.message) || "Network error",
      message: "Нэвтрэх үед алдаа гарлаа.",
    };
  }
};
