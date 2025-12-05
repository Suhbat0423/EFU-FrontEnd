import { API_URL } from "./common";

const commonnURL = API_URL;

export const login = async (email, password) => {
  const url = `${commonnURL}login`;
  const body = JSON.stringify({ email, password });

  try {
    const resv = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (!resv.ok) {
      throw new Error(`API Error: ${resv.status} ${resv.statusText}`);
    }

    const data = await resv.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
