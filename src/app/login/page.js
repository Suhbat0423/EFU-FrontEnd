import Image from "next/image";
import Logo from "../../../assets/logoBlue.png";
import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md  rounded-2xl overflow-hidden">
        <div className=" p-10 text-center">
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

        {/* Login Form */}
        <div className="p-8 lg:p-10">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Хэрэглэгчийн нэр эсвэл имэйл
              </label>
              <input
                type="text"
                placeholder="example@ufe.edu.mn"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Нууц үг
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-900 rounded"
                />
                <span className="text-gray-600">Намайг сана</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Нууц үгээ мартсан?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-800 transition duration-200 shadow-lg hover:shadow-xl"
            >
              НЭВТРЭХ
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
