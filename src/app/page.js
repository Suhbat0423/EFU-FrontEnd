import Image from "next/image";
import Logo from "../../assets/Logo.png";
import Logo2 from "../../assets/Logo2.png";
import Footer from "../../components/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <section className="relative w-full bg-linear-to-br from-blue-900 to-blue-700 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 py-24 lg:py-32 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex flex-col gap-8 max-w-2xl">
            <Image
              src={Logo2}
              width={120}
              height={80}
              alt="UFE - СЭЗИС лого"
              priority
            />

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Санхүү эдийн засгийн их сургуулийн
              <br />
              сурагчдын амжилт бүтээллийн талбар
            </h1>

            <p className="text-lg lg:text-xl text-blue-100 leading-relaxed">
              Бид оюутнуудын санаачилга, бүтээлч байдал, амжилтыг дэмжин,
              тэднийг ирээдүйн манлайлагч болгон бэлтгэдэг. Эндээс та өөрийн
              төсөл, судалгаа, бизнес санаагаа хуваалцаж, хамтдаа хөгжье!
            </p>

            <div className="flex gap-4 mt-6">
              <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 cursor-pointer transition">
                Төсөл оруулах
              </button>
            </div>
          </div>

          <div className="shrink-0">
            <Image
              src={Logo}
              width={420}
              height={420}
              alt="UFE - СЭЗИС"
              priority
              className="w-80 lg:w-96 drop-shadow-2xl"
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0"></div>
      </section>

      <Footer />
    </main>
  );
}
