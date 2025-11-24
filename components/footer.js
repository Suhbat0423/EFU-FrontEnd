import Link from "next/link";

const footerData = [
  {
    title: "UFE - СЭЗИС",
    data: [
      { title: "Бидний тухай", href: "/about" },
      { title: "Түүх", href: "/about/history" },
      { title: "Алсын хараа ба Эрхэм зорилго", href: "/about/mission" },
    ],
  },
  {
    title: "Сургалт",
    data: [
      { title: "Хөтөлбөрүүд", href: "/programs" },
      { title: "Факультетууд", href: "/faculties" },
      { title: "Судалгаа", href: "/research" },
    ],
  },
  {
    title: "Элсэлт",
    data: [
      { title: "Өргөдөл гаргах", href: "/admissions/apply" },
      { title: "Төлбөр", href: "/admissions/fees" },
      { title: "Тэтгэлэг", href: "/admissions/scholarships" },
    ],
  },
  {
    title: "Холбоо барих",
    data: [
      { title: "Бидэнтэй холбогдох", href: "/contact" },
      { title: "Хаяг байршил", href: "/contact#location" },
      { title: "Имэйл илгээх", href: "mailto:info@ufe.mn" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className=" text-black py-16 ">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {footerData.map((section) => (
            <div key={section.title} className="flex flex-col space-y-4">
              <h3 className="text-lg font-bold text-blue-900 uppercase tracking-wider">
                {section.title}
              </h3>
              <div className="flex flex-col space-y-2">
                {section.data.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="text-black hover:text-gray-600 transition-colors duration-200 text-sm"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8  text-center text-sm text-gray-400">
          © {new Date().getFullYear()} UFE - СЭЗИС. Бүх эрх хуулиар
          хамгаалагдсан.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
