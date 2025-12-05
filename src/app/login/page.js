"use client";

import Image from "next/image";
import Logo from "../../../assets/logoBlue.png";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/authStore";
import { API_URL } from "@/apis/common";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login: authLogin, setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authLogin(username, password);
      console.log("Login successful:", result);
      // persist user in store/localStorage if backend returned it
      const userFromResult =
        result?.data ||
        result?.user ||
        (result?.firstname || result?.lastname
          ? { firstname: result.firstname, lastname: result.lastname }
          : null);
      if (userFromResult) {
        setUser(userFromResult);
        console.log("login page: persisted user:", userFromResult);
      } else {
        console.log("login page: no user in login response, attempting /me");
      }

      // normalize token from possible response shapes
      const token =
        result?.token ||
        result?.accessToken ||
        result?.data?.token ||
        result?.data?.accessToken;
      if (!userFromResult && token) {
        try {
          const resp = await fetch(`${API_URL}me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (resp.ok) {
            const me = await resp.json();
            if (me) {
              setUser(me);
              console.log("login page: /me returned user:", me);
            } else {
              console.log("login page: /me returned no body");
            }
          } else {
            console.log(
              "login page: /me fetch failed:",
              resp.status,
              resp.statusText
            );
          }
        } catch (e) {
          console.error("login page: /me fetch error:", e);
        }
      }

      if (token) {
        router.push("/achievements");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err.message ||
          "Login failed. Please check your credentials and ensure the server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh]   flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl overflow-hidden bg-white">
        <div className="p-10 text-center ">
          <Image
            src={Logo}
            width={120}
            height={120}
            alt="UFE - СЭЗИС"
            priority
            className="mx-auto"
          />
          <h1 className="text-2xl font-bold text-blue-900 mt-6 tracking-wider">
            САНХҮҮ ЭДИЙН ЗАСГИЙН ИХ СУРГУУЛЬ
          </h1>
        </div>

        <div className="p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Хэрэглэгчийн нэр эсвэл имэйл
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="example@ufe.edu.mn"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Нууц үг
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-900 rounded focus:ring-blue-500"
                />
                <span className="text-gray-600">Намайг сана</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:underline font-medium"
              >
                Нууц үгээ мартсан?
              </Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-800 transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "НЭВТЭРЧ БУЙ..." : "НЭВТРЭХ"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              Шинэ хэрэглэгч бол{" "}
              <Link
                href="/register"
                className="text-blue-600 font-semibold hover:underline"
              >
                энд бүртгүүлнэ үү
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
