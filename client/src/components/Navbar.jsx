import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [isAuth, setAuth] = useState(false);
  const [isDropdown, setDropdown] = useState(false);

  const navLinks = [
    {
      id: 1,
      name: "Popular",
    },
    {
      id: 2,
      name: "Latest Added",
    },
    {
      id: 3,
      name: "Random",
    },
  ];

  return (
    <>
      <div
        id="navbar"
        className=" flex flex-col md:flex-row  gap-y-3 md:gap-y-0 py-5 md:py-0 items-center w-full md:h-[111px]  border border-black border-b-1 "
      >
        <div id="navigation" className="w-3/5 h-full hidden md:flex">
          <ul className="flex   items-center w-full h-full  text-[1.5rem] font-semibold md:pl-10">
            {navLinks.map(({ id, name }) => (
              <li
                key={id}
                className="hover:translate-y-[-3px] transition duration-100 cursor-pointer w-auto md:pr-10 text-center"
              >
                {name}
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
            <div
              onClick={() => setDropdown(!isDropdown)}
              className="hover:translate-y-[-3px] transition duration-100 cursor-pointer"
            >
              <RiArrowDropDownLine size={40} />
            </div>
          </div>
        ) : (
          <div id="not-logged" className="w-2/5 hidden md:flex ">
            <ul className="flex md:flex-row md:gap-10 items-center w-full h-full md:gap-y-0 text-[1.5rem] font-semibold justify-end md:pr-10">
              <button
                onClick={() => setAuth(true)}
                className="hover:translate-y-[-3px] transition duration-100 cursor-pointer"
              >
                Login
              </button>
              <li className="hover:translate-y-[-3px] transition duration-100 cursor-pointer border border-[#472316] bg-black text-white px-[56px] py-[9px]">
                Register
              </li>
            </ul>
          </div>
        )}

        <div onClick={() => setNav(!nav)} id="hamburger-button" className=" self-end mr-10 md:hidden">
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>

        {nav && (
          <div className="md:hidden w-full">
            <ul className="flex flex-col items-center w-full h-full gap-y-1 text-[1.5rem] font-semibold  border-black border-y-2 py-5">
              {navLinks.map(({ id, name }) => (
                <li key={id} className="hover:translate-y-[-3px] transition duration-100 cursor-pointer">
                  {name}
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
              <ul
                id="not-logged"
                className="flex flex-col items-center w-full h-full gap-y-1 text-[1.5rem] font-semibold py-5"
              >
                <button
                  onClick={() => setAuth(true)}
                  className="hover:translate-y-[-3px] transition duration-100 cursor-pointer"
                >
                  Login
                </button>
                <li className="hover:translate-y-[-3px] transition duration-100 cursor-pointer border border-[#472316] bg-black text-white px-[56px] py-[9px]">
                  Register
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
