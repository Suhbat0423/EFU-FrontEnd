"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/store/authStore";
import { verifyAchievement } from "@/apis/achievement";

export default function VerifyButton({ id, verified }) {
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(verified);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);
  const isTeacher = Boolean(
    user?.type === "teacher" ||
      user?.role === "teacher" ||
      user?.isTeacher === true ||
      !!user?.teacherId
  );

  const onVerify = async () => {
    if (!id || !token) return;
    setLoading(true);
    const res = await verifyAchievement(id, token);
    if (res && !res.error) {
      const updated = res?.success === true ? res.data : res?.data ?? res;
      const newStatus = !!(updated?.verified ?? !status);
      setStatus(newStatus);
    }
    setLoading(false);
  };

  if (!mounted || !isTeacher) return null;

  return (
    <button
      type="button"
      onClick={onVerify}
      disabled={loading}
      className={`text-xs px-3 py-1 rounded-md border ${
        status
          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
          : "bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-50"
      } disabled:opacity-60`}
    >
      {loading ? "Шинэчилж байна..." : status ? "Цуцлах" : "Баталгаажуулах"}
    </button>
  );
}
