"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "../assets/Logo.png";
import { useAuth } from "@/store/authStore";

const Header = () => {
  const { isAuth, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="w-full bg-white shadow-sm sticky top-0 z-50">
      <nav className="flex items-center justify-between px-6 py-4 max-w-[90%] mx-auto">
        <Link href="/" className="shrink-0">
          <Image
            src={Logo}
            width={140}
            height={40}
            alt="UFE - СЭЗИС Logo"
            priority
            className="h-10 w-auto"
          />
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/achievements">
            <h1 className="text-blue-600 relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-current after:transform after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left me-4">
              Амжилтууд
            </h1>
          </Link>

          {isAuth ? (
            <div className="flex items-center gap-4">
              <Link href="/profile">
                <h1 className="text-blue-600 relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-current after:transform after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left me-4">
                  Нүүр хуудас
                </h1>
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-lg border-2 border-red-500 px-4 py-2 text-red-500 font-medium hover:bg-red-500 hover:text-white transition-all duration-200 whitespace-nowrap"
              >
                Гарах
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button className="rounded-lg border-2 border-blue-600 px-6 py-2 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition-all duration-200 whitespace-nowrap">
                Нэвтрэх
              </button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
