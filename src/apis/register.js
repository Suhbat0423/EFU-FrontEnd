import { API_URL } from "./common";

const commonnURL = API_URL;

export const register = async (data) => {
  const url = `${commonnURL}students`;
  const body = JSON.stringify({
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    studentId: data.studentId,
    password: data.password,
    class: data.class,
  });

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

    const responseData = await resv.json();
    return responseData;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};
