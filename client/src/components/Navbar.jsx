import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  {
    id: 1,
    name: "Popular",
    link: "/popular",
  },
  {
    id: 2,
    name: "Latest Added",
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
      <div
        id="navbar"
        className="font-dm-display text-primary flex flex-col md:flex-row gap-y-3 md:gap-y-0 py-5 md:py-0 items-center w-full md:h-[111px] border border-black border-b-1"
      >
        <div id="navigation" className="w-3/5 h-full hidden md:flex">
          <ul className="flex space-x-4 items-center w-full h-full  text-[1.5rem] font-semibold md:pl-10">
            {navLinks.map(({ id, name, link }) => (
              <li
                key={id}
                className={`border-b-2  ${pathname === link ? "border-b-black" : "border-b-transparent hover:border-b-black"}`}
              >
                <Link to={link} className="text-md">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {isAuth ? (
          <div
            id="logged"
            className="w-2/5 hidden md:flex md:flex-row md:gap-10 items-center h-full md:gap-y-0 justify-end md:pr-10"
          >
            <div className="hover:translate-y-[-3px] transition duration-100 cursor-pointer">
              <IoMdNotificationsOutline size={40} />
            </div>
            <div className="hover:translate-y-[-3px] transition duration-100 cursor-pointer text-[1.5rem]">
              User Name
            </div>
            <div className="hover:translate-y-[-3px] transition duration-100 cursor-pointer">
              <RiArrowDropDownLine size={40} />
            </div>
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

        <div onClick={() => setNav(!nav)} id="hamburger-button" className=" self-end mr-10 md:hidden">
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
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
