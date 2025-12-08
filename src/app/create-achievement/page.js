"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createAchievement } from "@/apis/achievement";

export default function CreateAchievementPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [studentId, setStudentId] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const rawUser = localStorage.getItem("user");
      const sidRaw = localStorage.getItem("studentId");
      const tokRaw =
        localStorage.getItem("token") || localStorage.getItem("accessToken");
      if (rawUser) {
        const u = JSON.parse(rawUser);
        setStudentId(u?._id || u?.id || u?.studentId || "");
      } else if (sidRaw) {
        setStudentId(sidRaw);
      }
      if (tokRaw) setToken(tokRaw);
    } catch {}
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!title.trim() || !description.trim()) {
      setError("Гарчиг болон тайлбарыг бөглөнө үү.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        title: title.trim(),
        description: description.trim(),
        ...(studentId ? { student: studentId } : {}),
      };
      const res = await createAchievement(payload, token);
      if (res?.error) {
        setError(
          res?.statusCode === 401
            ? "Эрхгүй байна. Нэвтэрч орно уу."
            : res?.statusText || "Амжилт нэмэхэд алдаа гарлаа."
        );
      } else {
        router.push("/achievements");
      }
    } catch (err) {
      setError("Сүлжээний алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Амжилт нэмэх</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-md border border-red-300 bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Гарчиг
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Жишээ: Math Competition Winner"
              className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Тайлбар
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Жишээ: Won first place in regional math competition..."
              className="w-full rounded-md border border-zinc-300 px-3 py-2 min-h-[140px] focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push("/achievements")}
              className="px-4 py-2 rounded-md border border-zinc-300 text-zinc-700 hover:bg-zinc-50"
            >
              Буцах
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 disabled:opacity-60"
            >
              {loading && (
                <span className="inline-block w-4 h-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
              )}
              Амжилт нэмэх
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
