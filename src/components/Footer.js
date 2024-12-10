import Link from "next/link";

const SITEMAP = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Our Team", "Projects"],
  },
  {
    title: "Help Center",
    links: ["Discord", "Twitter", "GitHub", "Contact Us"],
  },
  {
    title: "Resources",
    links: ["Blog", "Newsletter", "Free Products", "Affiliate Program"],
  },
  {
    title: "Products",
    links: ["Templates", "UI Kits", "Icons", "Mockups"],
  },
];

const currentYear = new Date().getFullYear();

export default function FooterWithSitemap() {
  return (
    <footer className="relative w-full bg-white dark:bg-gray-800 text-black dark:text-white">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="mx-auto grid w-full grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          {SITEMAP.map(({ title, links }, key) => (
            <div key={key} className="w-full">
              <h3 className="mb-4 font-bold uppercase text-gray-500 dark:text-gray-300">
                {title}
              </h3>
              <ul className="space-y-1">
                {links.map((link, key) => (
                  <li key={key} className="font-normal">
                    <a
                      href="#"
                      className="inline-block py-1 pr-2 transition-transform hover:scale-105 dark:hover:text-gray-400"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between dark:border-gray-700">
          <p className="mb-4 text-center font-normal dark:text-gray-400 md:mb-0">
            &copy; {currentYear} <a href="https://example.com">Your Company</a>. All Rights Reserved. 
            <Link href="/admin/" passHref target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                Admin
            </Link>
          </p>
          <div className="flex gap-4 text-black dark:text-white sm:justify-center">
            <a href="#" className="opacity-80 transition-opacity hover:opacity-100">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            {/* Autres icônes sociales ici */}
          </div>
        </div>
      </div>
    </footer>
  );
}
