"use client";

import Image from "next/image";
import Link from "next/link";

const AchievementCard = ({
  id,
  title,
  description,
  icon,
  progress,
  date,
  student,
  verified,
}) => {
  const truncateText = (text, max = 120) => {
    if (!text) return "";
    if (text.length <= max) return text;
    const sliced = text.slice(0, max);
    const lastSpace = sliced.lastIndexOf(" ");
    const safe = lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced;
    return `${safe} ...`;
  };
  return (
    <Link href={`/achievement/${id}`} className="no-underline">
      <div className="group rounded-xl border border-zinc-200 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow py-4 px-4">
        <div className="flex items-start gap-3">
          {icon ? (
            <div className="relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden bg-zinc-100">
              <Image
                src={icon}
                alt={title}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
          ) : null}

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold text-zinc-900">
                {title}
              </h3>
              <div className="flex items-center gap-2">
                {verified !== undefined ? (
                  <span
                    className={`text-[11px] sm:text-xs px-2 py-1 rounded-full ${
                      verified
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {verified ? "Баталгаажсан" : "Баталгаажаагүй"}
                  </span>
                ) : null}
                {typeof progress === "number" ? (
                  <span className="text-xs sm:text-sm px-2 py-1 rounded-full bg-zinc-100 text-zinc-700">
                    {progress}%
                  </span>
                ) : null}
              </div>
            </div>
            {description ? (
              <p className="mt-1 text-xs sm:text-sm text-zinc-600">
                {truncateText(description, 120)}
              </p>
            ) : null}

            {typeof progress === "number" ? (
              <div className="mt-3">
                <div className="h-2 w-full rounded-full bg-zinc-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-600"
                    style={{
                      width: `${Math.min(Math.max(progress, 0), 100)}%`,
                    }}
                  />
                </div>
              </div>
            ) : null}

            <div className="mt-3 flex items-center justify-between">
              {student?.name ? (
                <span className="text-[11px] sm:text-xs text-zinc-600">
                  {student.name}
                  {student.class ? ` • ${student.class}` : ""}
                </span>
              ) : (
                <span />
              )}
              {date ? (
                <p className="text-[11px] sm:text-xs text-zinc-500">
                  {new Date(date).toLocaleDateString()}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

import { useMemo, useState } from "react";

const Achievements = ({ title = "", subtitle, items = [], pageSize = 5 }) => {
  const [page, setPage] = useState(1);
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const currentItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);
  return (
    <section className="w-full my-6 sm:my-8">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-zinc-600">{subtitle}</p>
        ) : null}
      </div>

      {total === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 p-6 text-center text-zinc-600 bg-white/60">
          <p className="text-sm">No achievements to display yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:gap-5">
          {currentItems.map((a) => (
            <AchievementCard key={a.id ?? a.title} {...a} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-zinc-600">
            Page {page} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-3 py-1.5 rounded-md border border-zinc-300 bg-white text-sm disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              type="button"
              className="px-3 py-1.5 rounded-md border border-zinc-300 bg-white text-sm disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Achievements;
