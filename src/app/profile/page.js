"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Achievements from "../../../components/achievement";
import { achievementByStudentId, getAchievements } from "@/apis/achievement";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Read user from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("user");
      const sidRaw = localStorage.getItem("studentId");
      const tokRaw =
        localStorage.getItem("token") || localStorage.getItem("accessToken");
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed);
      }
      // If a standalone studentId exists, keep it available even if user is missing
      if (!raw && sidRaw) {
        setUser((prev) => ({ ...(prev || {}), studentId: sidRaw }));
      }
      if (tokRaw) setToken(tokRaw);
    } catch {}
  }, []);

  // Load achievements for this student (or all if unknown)
  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const sid =
          user?._id ||
          user?.id ||
          user?.studentId ||
          user?.student?._id ||
          user?.student?.id;
        const data = sid
          ? await achievementByStudentId(sid, token)
          : await getAchievements();
        const list = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data)
          ? data
          : [];
        if (!active) return;
        const normalized = list.map((a) => ({
          id: a.id ?? a._id ?? `${a.title}-${a.createdAt ?? a.date ?? ""}`,
          title: a.title ?? a.name ?? "Achievement",
          description: a.description ?? a.details ?? "",
          icon: a.icon ?? a.image ?? null,
          progress: typeof a.progress === "number" ? a.progress : undefined,
          date: a.date ?? a.createdAt ?? undefined,
          student: a.student
            ? {
                name: `${a.student.firstname ?? ""} ${
                  a.student.lastname ?? ""
                }`.trim(),
                id: a.student._id ?? a.student.id ?? a.student.studentId,
                class: a.student.class,
              }
            : undefined,
          verified: !!a.verified,
        }));
        setItems(normalized);
      } catch (e) {
        if (!active) return;
        setError("Амжилтуудыг авахад алдаа гарлаа.");
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [user]);

  const studentId =
    user?._id ||
    user?.id ||
    user?.studentId ||
    user?.student?._id ||
    user?.student?.id;
  const myAchievements = useMemo(() => {
    if (!studentId) return items;
    const sidStr = String(studentId);
    return items.filter((it) => String(it?.student?.id || "") === sidStr);
  }, [items, studentId]);

  return (
    <div className="min-h-[90vh] px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-xl bg-white  p-6 mb-8">
          <h1 className="text-2xl font-bold text-zinc-900">Профайл</h1>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-zinc-700">
            <div>
              <div className="text-zinc-500">Оюутны нэр</div>
              <div className="font-medium">
                {user
                  ? `${user?.firstname ?? ""} ${user?.lastname ?? ""}`.trim() ||
                    user?.name ||
                    "-"
                  : "-"}
              </div>
            </div>
            <div>
              <div className="text-zinc-500">Код</div>
              <div className="font-medium">{studentId ?? "-"}</div>
            </div>
            <div>
              <div className="text-zinc-500">Ангилал</div>
              <div className="font-medium">
                {user?.class ?? user?.group ?? "-"}
              </div>
            </div>
            <div>
              <div className="text-zinc-500">Имэйл</div>
              <div className="font-medium">{user?.email ?? "-"}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex justify-between w-full gap-4">
            <h2 className="text-xl font-semibold">Миний Амжилтууд</h2>
            <Link href="/create-achievement">
              <button
                type="button"
                className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
              >
                {/* plus icon */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeWidth="2" d="M12 6v12M6 12h12" />
                </svg>
                <span>Амжилт нэмэх</span>
              </button>
            </Link>
          </div>
          {loading && (
            <span className="text-sm text-zinc-500">Уншиж байна...</span>
          )}
        </div>
        {error && (
          <div className="mb-4 p-3 rounded-md border border-red-300 bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}
        <Achievements items={myAchievements} />
      </div>
    </div>
  );
}
