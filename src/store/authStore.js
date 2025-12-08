import { login } from "@/apis/auth";
import { create } from "zustand";

const getInitialAuth = () => {
  if (typeof window === "undefined") return { token: null, user: null };
  const token = localStorage.getItem("token");
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch (e) {
    user = null;
  }
  return { token, user };
};

export const useAuth = create((set) => {
  const initial = getInitialAuth();
  return {
    isAuth: !!initial.token,
    token: initial.token,
    user: initial.user,
    login: async (email, password) => {
      try {
        const result = await login(email, password);
        if (result?.error) {
          return result;
        }

        // normalize token from various possible response shapes
        const token =
          result?.token ||
          result?.accessToken ||
          result?.data?.token ||
          result?.data?.accessToken ||
          null;

        if (token) {
          // prefer result.user, fallback to firstname/lastname fields, try nested data
          const src = result?.data || result;
          let user =
            src?.user ||
            (src?.firstname || src?.lastname
              ? { firstname: src.firstname, lastname: src.lastname }
              : null);

          set({ isAuth: true, token, user });
          localStorage.setItem("token", token);
          if (user) localStorage.setItem("user", JSON.stringify(user));
        }

        return result;
      } catch (error) {
        return {
          error: true,
          statusCode: 0,
          statusText: (error && error.message) || "Network error",
          message: "Нэвтрэх үед алдаа гарлаа.",
        };
      }
    },
    setUser: (user) => {
      set({ user });
      try {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          console.log("authStore: setUser -> saved user:", user);
        } else {
          localStorage.removeItem("user");
          console.log("authStore: setUser -> cleared user");
        }
      } catch (e) {
        console.error("authStore: setUser error:", e);
      }
    },
    logout: () => {
      set({ isAuth: false, token: null, user: null });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  };
});
