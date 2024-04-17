import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaXmark, FaBars } from "react-icons/fa6";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  // set toggleMenu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    const handleSticky = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleSticky);

    return () => {
      window.addEventListener("scroll", handleSticky);
    };
  });

  const navItems = [
    { page: "Home", path: "/" },
    { page: "Login", path: "/login" },
  ];
  return (
    <header className="w-full bg-yellow-50  bg-opacity-35 fixed top-0 left-0 right-0  border-b ">
      {/* secoundary nav section */}

      <nav
        className={`py-4 lg:px-14 px-4 ${
          isSticky
            ? "static top-0 left-0 right-0 border-b backdrop-filter backdrop-blur-md  text-black shadow-lg duration-300"
            : ""
        }`}
      >
        <div className="flex justify-between items-center text-black gap-8">
          <Link
            to="#"
            className="text-2xl font-semibold flex items-center space-x-3"
          >
            {" "}
            <span className="lg:text-icon_color uppercase font-bold lg:text-3xl md:text-5xl ">
              Feastables
            </span>
          </Link>

          {/* Nav items for large devices  */}
          <ul className="lg:flex space-x-8 hidden">
            {navItems.map(({ page, path }) => (
              <li
                key={path}
                className="  rounded block font-bold text-text_black hover:text-text_black "
              >
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  to={path}
                >
                  {page}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* menu btn for only mobile device */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-black focus:outline-none focus:text-black"
            >
              {isMenuOpen ? (
                <FaXmark className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Nav item for mobile device */}
        <div
          className={`space-y-4 px-4 mt-16 py-7 bg-black   ${
            isMenuOpen ? " fixed top-0 right-0 left-0" : "hidden"
          }`}
        >
          {navItems.map(({ page, path }) => (
            <li
              key={path}
              className="  rounded block text-white hover:text-text_black "
            >
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
                to={path}
              >
                {page}
              </NavLink>
            </li>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
