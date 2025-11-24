import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/Logo.png";

const Header = () => {
  return (
    <div className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-[90%] mx-auto">
        <Link href="/" className="flex-shrink-0">
          <Image
            src={Logo}
            width={140}
            height={40}
            alt="UFE - СЭЗИС Logo"
            priority
            className="h-10 w-auto"
          />
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/login">
            <button className="rounded-lg border-2 border-blue-600 px-6 py-2 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition-all duration-200 whitespace-nowrap">
              Нэвтрэх
            </button>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
