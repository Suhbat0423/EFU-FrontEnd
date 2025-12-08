import { API_URL } from "./common";

const commonnURL = API_URL;

export const getAchievements = async () => {
  const url = `${commonnURL}achievements`;

  try {
    const resv = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!resv.ok) {
      throw new Error(`API Error: ${resv.status} ${resv.statusText}`);
    }

    const data = await resv.json();
    return data;
  } catch (error) {
    console.error("Get Achievements error:", error);
    throw error;
  }
};

export const getAchievementById = async (id) => {
  const url = `${commonnURL}achievements/${id}`;

  try {
    const resv = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!resv.ok) {
      return {
        error: true,
        statusCode: resv.status,
        statusText: resv.statusText,
      };
    }

    const data = await resv.json();
    return data;
  } catch (error) {
    return {
      error: true,
      statusCode: 0,
      statusText: (error && error.message) || "Network error",
    };
  }
};

export const verifyAchievement = async (id, token) => {
  const url = `${commonnURL}achievements/${id}/verify`;
  try {
    const resv = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!resv.ok) {
      return {
        error: true,
        statusCode: resv.status,
        statusText: resv.statusText,
      };
    }

    const data = await resv.json();
    return data;
  } catch (error) {
    return {
      error: true,
      statusCode: 0,
      statusText: (error && error.message) || "Network error",
    };
  }
};

export const achievementByStudentId = async (studentId) => {
  const url = `${commonnURL}achievements/student/${studentId}`;

  try {
    const resv = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!resv.ok) {
      throw new Error(`API Error: ${resv.status} ${resv.statusText}`);
    }

    const data = await resv.json();
    return data;
  } catch (error) {
    console.error("Get Achievements by Student ID error:", error);
    throw error;
  }
};

export const createAchievement = async (achievementData, token) => {
  const url = `${commonnURL}achievements`;

  try {
    const resv = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(achievementData),
    });

    if (!resv.ok) {
      return {
        error: true,
        statusCode: resv.status,
        statusText: resv.statusText,
      };
    }

    const data = await resv.json();
    return data;
  } catch (error) {
    return {
      error: true,
      statusCode: 0,
      statusText: (error && error.message) || "Network error",
    };
  }
};
