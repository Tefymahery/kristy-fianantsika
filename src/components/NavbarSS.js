import React, { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Input,
  MenuItem,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NavbarWithSubmenu({ categories }) {
  const [openNav, setOpenNav] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  // Sous-menu des catégories pour la version bureau
  const renderDesktopCategoriesMenu = () => (
    <div className="relative group">
      <Typography
        as="div"
        variant="small"
        className="p-1 font-medium text-gray-600 flex items-center cursor-pointer"
        onClick={() => setOpenMenu(!openMenu)}
      >
        Categories
        <ChevronDownIcon className={`h-5 w-5 ml-2 transform ${openMenu ? "rotate-180" : ""}`} />
      </Typography>
      {openMenu && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-md rounded-lg">
          {categories.map((category) => (
            <Link href={`/categories/${category.id}`} key={category.id}>
              <div className="p-4 hover:bg-gray-100">
                <div className="font-semibold text-gray-800">{category.title}</div>
                <div className="text-gray-500 text-sm">{category.description}</div>
                <div className="text-gray-700 text-xs">{category.articleCount} articles</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  // Sous-menu des catégories pour la version mobile
  const renderMobileCategoriesMenu = () => (
    <div className="mt-2 space-y-2">
      {categories.map((category) => (
        <Link href={`/categories/${category.id}`} key={category.id}>
          <div className="pl-4 py-2 bg-gray-100 rounded-md">
            <div className="font-semibold text-gray-800">{category.title}</div>
            <div className="text-gray-500 text-sm">{category.description}</div>
            <div className="text-gray-700 text-xs">{category.articleCount} articles</div>
          </div>
        </Link>
      ))}
    </div>
  );

  // Liste principale de navigation
  const navList = (
    <ul className="flex flex-col lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" variant="small" className="p-1 font-medium text-gray-600">
        <Link href="#" className="flex items-center">
          Home
        </Link>
      </Typography>
      <li className="hidden lg:block">{renderDesktopCategoriesMenu()}</li>
      <Typography as="li" variant="small" className="p-1 font-medium text-gray-600">
        <Link href="#" className="flex items-center">
          About Us
        </Link>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-medium text-gray-600">
        <Link href="#" className="flex items-center">
          Contact
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo */}
        <Typography as="a" href="#" className="mr-4 cursor-pointer py-1.5 font-medium">
          My Website
        </Typography>

        {/* Menu desktop */}
        <div className="hidden lg:flex items-center gap-x-2">{navList}</div>

        {/* Recherche */}
        <div className="hidden lg:flex items-center gap-x-2">
          <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              placeholder="Search"
              containerProps={{ className: "min-w-[288px]" }}
              className="!border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
            />
          </div>
          <Button size="md" className="rounded-lg">
            Search
          </Button>
        </div>

        {/* Bouton hamburger pour mobile */}
        <IconButton variant="text" className="lg:hidden" onClick={() => setOpenNav(!openNav)}>
          {openNav ? <XMarkIcon className="h-6 w-6" strokeWidth={2} /> : <Bars3Icon className="h-6 w-6" strokeWidth={2} />}
        </IconButton>
      </div>

      {/* Menu mobile */}
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          {openMenu && renderMobileCategoriesMenu()}
        </div>
      </Collapse>
    </Navbar>
  );
}
