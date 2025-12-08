import Link from "next/link";
import Achievements from "../../../components/achievement";
import { getAchievements } from "../../apis/achievement";

export default async function AchievementsPage() {
  let items = [];
  try {
    const data = await getAchievements();
    const list = Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data)
      ? data
      : [];
    items = list.map((a) => ({
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
            id: a.student.studentId,
            class: a.student.class,
          }
        : undefined,
      verified: !!a.verified,
    }));
  } catch (e) {
    items = [];
  }

  return (
    <div className="min-h-[90vh] px-4 sm:px-6 lg:px-30 py-6">
      <div className="text-2xl sm:text-3xl font-bold flex justify-between">
        <h1> Бүх сурагчдын Амжилтууд</h1>
        <Link href="/create-achievement">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
          >
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
      <div className="py-4">
        <input
          type="text"
          placeholder="Оюутанты код..."
          className=" w-full rounded-xl border border-gray-300 px-3 py-2"
        />
        <Achievements items={items} />
      </div>
    </div>
  );
}
