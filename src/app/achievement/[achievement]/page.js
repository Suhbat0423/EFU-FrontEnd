import { getAchievementById } from "@/apis/achievement";
import VerifyButton from "./verify-button";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AchievementPage({ params }) {
  const resolvedParams = await params;
  const achievement = resolvedParams?.achievement ?? null;

  let item = null;
  let errorInfo = null;

  try {
    if (!achievement) {
      errorInfo = {
        error: true,
        statusCode: 0,
        statusText: "Route param missing",
      };
    } else {
      const res = await getAchievementById(achievement);

      if (!res) {
        errorInfo = { error: true, statusCode: 0, statusText: "No response" };
      } else if (res.error) {
        errorInfo = res;
      } else {
        const a = res?.success === true ? res.data : res?.data ?? res;
        item = {
          id: a._id ?? a.id ?? achievement,
          title: a.title ?? "Achievement",
          description: a.description ?? "",
          date: a.createdAt ?? a.date,
          verified: !!a.verified,
          student: a.student
            ? {
                name: `${a.student.firstname ?? ""} ${
                  a.student.lastname ?? ""
                }`.trim(),
                id: a.student.studentId,
                class: a.student.class,
              }
            : undefined,
        };
      }
    }
  } catch (e) {
    errorInfo = { error: true, statusCode: 0, statusText: "Unknown error" };
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <a
          href="/achievements"
          className="inline-block text-sm text-indigo-600 hover:underline mb-6"
        >
          ← Буцах
        </a>

        <h1 className="text-4xl font-bold leading-tight text-zinc-900 flex justify-between">
          {item?.title ?? "Амжилт"}
          {item && (
            <div className="mb-6">
              <span
                className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${
                  item.verified
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {item.verified ? "Баталгаажсан" : "Баталгаажаагүй"}
              </span>
            </div>
          )}
        </h1>

        <div className="text-sm text-zinc-500 mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          {item?.student?.name && (
            <p>
              Оюутан: {item.student.name}{" "}
              {item.student.class ? `• ${item.student.class}` : ""}
            </p>
          )}
          <div className="flex items-center gap-3">
            {item?.date && <p>{new Date(item.date).toLocaleDateString()}</p>}
          </div>
        </div>
        {item?.description && (
          <article className="prose prose-zinc prose-lg">
            <p>{item.description}</p>
          </article>
        )}

        {!item && (
          <div className="mt-10 rounded-xl border border-dashed border-zinc-300 p-6 text-center text-zinc-600 bg-white/60">
            <p className="text-sm">
              {errorInfo?.statusCode === 404
                ? "Амжилт олдсонгүй."
                : "Алдаа гарлаа. Дараа дахин оролдоно уу."}
            </p>
            {errorInfo?.statusText && (
              <p className="mt-2 text-xs text-zinc-500">
                {errorInfo.statusText}
              </p>
            )}
          </div>
        )}
        {item?.id && (
          <div className="mt-8 flex justify-end">
            <VerifyButton id={item.id} verified={item.verified} />
          </div>
        )}
      </div>
    </div>
  );
}
