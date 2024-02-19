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
  const [isAuth, setAuth] = useState(true);

  return (
    <>
      <div className="flex flex-row justify-between md:px-12">
        <div
          id="navbar"
          className="font-dm-display text-primary flex flex-col md:flex-row gap-y-3 md:gap-y-0 py-5 md:py-0 items-center w-full md:h-[111px]"
        >
          <div id="navigation" className="w-full h-full hidden md:flex">
            <ul className="flex space-x-4 items-center w-full h-full  text-[1.5rem] font-semibold md:pl-10">
              {navLinks.map(({ id, name, link }) => (
                <li
                  key={id}
                  className={`border-b-2  ${pathname === link ? "border-b-black" : "border-b-transparent hover:border-b-black"}`}
                >
                  <Link to={link} className="text-md tracking-wide">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {isAuth ? (
            <div
              id="logged"
              className="hidden w-full  md:flex md:flex-row md:space-x-4 items-center h-full md:gap-y-0 justify-end"
            >
              <div className="font-dm-sans font-bold">lalallal ada</div>
              <Dropdown placement="bottom-end">
                <MenuHandler>
                  <ChevronDown className="h-4 w-4 hover:cursor-pointer" />
                </MenuHandler>
                <MenuList className="flex flex-col space-y-2 rounded-none lg:w-[240px] font-dm-sans">
                  <a>Account</a>
                  <a>Account</a>
                  <a>Account</a>
                </MenuList>
              </Dropdown>
            </div>
          ) : (
            <div id="not-logged" className="w-2/5 hidden md:flex ">
              <div className="flex md:flex-row md:gap-10 items-center w-full h-full md:gap-y-0 text-[1.5rem] font-semibold justify-end md:pr-10">
                <div
                  onClick={() => setAuth(true)}
                  className="border-b-2 border-transparent hover:border-b-black hover:border-b-2 transition duration-100 cursor-pointer"
                >
                  <Link to="/login">Login</Link>
                </div>
                <div className="hover:bg-black/80 transition duration-100 cursor-pointer border  bg-black text-white px-[56px] py-[9px]">
                  <Link to="/register">Register</Link>
                </div>
              </div>
            </div>
          )}
        </div>
        <div onClick={() => setNav(!nav)} id="hamburger-button" className="inline-flex items-center mr-10 md:hidden">
          {nav ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </div>
      </div>
      {nav && (
        <div className="md:hidden w-full absolute bg-white border-black border-b-2">
          <ul className="flex flex-col items-center w-full h-full gap-y-1 text-[1.5rem] font-semibold  border-black border-b-2 py-5">
            {navLinks.map(({ id, name, link }) => (
              <li key={id} className="hover:translate-y-[-3px] transition duration-100 cursor-pointer">
                <Link to={link}> {name} </Link>
              </li>
            ))}
          </ul>
          {isAuth ? (
            <div className="flex flex-col items-center gap-y-1 text-[1.5rem] font-semibold py-5">
              <div className="hover:translate-y-[-3px] transition duration-100 cursor-pointer">User Name</div>
              <div
                className="hover:translate-y-[-3px] transition duration-100 cursor-pointer"
                onClick={() => setAuth(false)}
              >
                Log Out
              </div>
            </div>
          ) : (
            <div
              id="not-logged"
              className="flex flex-col items-center w-full h-full gap-y-1 text-[1.5rem] font-semibold py-5"
            >
              <div className="hover:translate-y-[-3px] transition duration-100 cursor-pointer">
                <Link to="/login">Login</Link>
              </div>
              <div className="hover:translate-y-[-3px] transition duration-100 cursor-pointer border border-[#472316] bg-black text-white px-[56px] py-[9px]">
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
