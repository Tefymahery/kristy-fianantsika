import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Navbar, Typography, IconButton, Collapse } from "@material-tailwind/react";
import { FiMenu, FiX } from "react-icons/fi";

const NavbarAdmin = () => {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navList = (
    <ul className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
      {[
        { label: "Dashboard", href: "/admin/dashboard" },
        { label: "Articles", href: "/admin/articles" },
        { label: "Users", href: "/admin/users" },
        { label: "Categories", href: "/admin/categories" },
        { label : "Home: visitor", href:"/", class : "bg-green-200 rounded-lg p-1"},
      ].map((item, idx) => (
        <Typography
          key={idx}
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white rounded-lg"
        >
          <Link href={item.href} className={item.class}>{item.label}</Link>
        </Typography>
      ))}
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-50 mx-auto max-w-screen-lg px-4 py-2">
      <div className="flex items-center justify-between">
        <Typography as="a" href="#" variant="h6" className="text-blue-500">
          Admin Panel
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-blue-gray-500 lg:hidden"
          onClick={() => setOpenNav(!openNav)}
          aria-label="Toggle Navigation"
        >
          {openNav ? <FiX /> : <FiMenu />}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="flex flex-col gap-2 pb-4 lg:hidden">{navList}</div>
      </Collapse>
    </Navbar>
  );
};

export default NavbarAdmin;
