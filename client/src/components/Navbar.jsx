import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Menu as Dropdown, MenuHandler, MenuList } from "@material-tailwind/react";

const navLinks = [
  {
    id: 1,
    name: "Popular",
    link: "/popular",
  },
  {
    id: 2,
    name: "Latest",
    link: "/latest",
  },
  {
    id: 3,
    name: "Random",
    link: "/random",
  },
];

function Navbar() {
  const location = useLocation();
  const { pathname } = location;
  const [nav, setNav] = useState(false);
  const [isAuth, setAuth] = useState(false);

  return (
    <>
      <div className="flex flex-row justify-between md:px-12">
        <div
          id="navbar"
          className="flex w-full flex-col items-center gap-y-3 py-5 font-dm-display text-primary md:h-[111px] md:flex-row md:gap-y-0 md:py-0"
        >
          <div id="navigation" className="hidden h-full w-full md:flex">
            <ul className="flex h-full w-full items-center space-x-8  text-[1.5rem] font-semibold ">
              {navLinks.map(({ id, name, link }) => (
                <li
                  key={id}
                  className={`border-b-2  ${pathname === link ? "border-b-black" : "border-b-transparent hover:border-b-black"}`}
                >
                  <Link to={link} className="text-md tracking-wide">
                    {name.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {isAuth ? (
            <div
              id="logged"
              className="hidden h-full  w-full items-center justify-end md:flex md:flex-row md:gap-y-0 md:space-x-4"
            >
              <div className="font-dm-sans font-bold">lalallal ada</div>
              <Dropdown placement="bottom-end">
                <MenuHandler>
                  <ChevronDown className="h-4 w-4 hover:cursor-pointer" />
                </MenuHandler>
                <MenuList className="flex flex-col space-y-2 rounded-none font-dm-sans lg:w-[240px]">
                  <a>Account</a>
                  <a>Account</a>
                  <a>Account</a>
                </MenuList>
              </Dropdown>
            </div>
          ) : (
            <div id="not-logged" className="hidden w-2/5 md:flex ">
              <div className="flex h-full w-full items-center justify-end text-[1.5rem] font-semibold md:flex-row md:gap-10 md:gap-y-0 md:pr-10">
                <div
                  onClick={() => setAuth(true)}
                  className="cursor-pointer border-b-2 border-transparent transition duration-100 hover:border-b-2 hover:border-b-black"
                >
                  <Link to="/login">LOGIN</Link>
                </div>
                <div className="cursor-pointer border bg-black px-[56px] py-[9px]  text-white transition duration-100 hover:bg-black/80">
                  <Link to="/register">REGISTER</Link>
                </div>
              </div>
            </div>
          )}
        </div>
        <div onClick={() => setNav(!nav)} id="hamburger-button" className="mr-10 inline-flex items-center md:hidden">
          {nav ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </div>
      </div>
      {nav && (
        <div className="absolute w-full border-b-2 border-black bg-white md:hidden">
          <ul className="flex h-full w-full flex-col items-center gap-y-1 border-b-2 border-black  py-5 text-[1.5rem] font-semibold">
            {navLinks.map(({ id, name, link }) => (
              <li key={id} className="cursor-pointer transition duration-100 hover:translate-y-[-3px]">
                <Link to={link}> {name} </Link>
              </li>
            ))}
          </ul>
          {isAuth ? (
            <div className="flex flex-col items-center gap-y-1 py-5 text-[1.5rem] font-semibold">
              <div className="cursor-pointer transition duration-100 hover:translate-y-[-3px]">User Name</div>
              <div
                className="cursor-pointer transition duration-100 hover:translate-y-[-3px]"
                onClick={() => setAuth(false)}
              >
                Log Out
              </div>
            </div>
          ) : (
            <div
              id="not-logged"
              className="flex h-full w-full flex-col items-center gap-y-1 py-5 text-[1.5rem] font-semibold"
            >
              <div className="cursor-pointer transition duration-100 hover:translate-y-[-3px]">
                <Link to="/login">Login</Link>
              </div>
              <div className="cursor-pointer border border-[#472316] bg-black px-[56px] py-[9px] text-white transition duration-100 hover:translate-y-[-3px]">
                <Link to="/register">Register</Link>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
