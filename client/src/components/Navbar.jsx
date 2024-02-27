import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Menu as Dropdown, MenuHandler, MenuList } from "@material-tailwind/react";
import { useFetchUser } from "../hooks/user-hooks.js";
import { Loader } from "lucide-react";
import { useCookies } from "react-cookie";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { useState } from "react";

const navLinks = [
  {
    id: 0,
    name: "Home",
    link: "/",
  },
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
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const [isLoading, data, error] = useFetchUser();
  // eslint-disable-next-line no-unused-vars
  const [_cookies, _setCookie, removeCookie] = useCookies(["token"]);

  function logout() {
    removeCookie("token", { path: "/" });
    return window.location.reload();
  }

  function toggleDrawer() {
    setOpen(!open);
  }

  if (isLoading) return <Loader className="h-5 w-5" />;
  if (error) return <p>error</p>;

  return (
    <>
      <div className="flex flex-row lg:px-12">
        <div
          id="navbar"
          className="flex w-full items-center justify-end gap-y-3 py-5 font-dm-display text-primary md:flex-row md:justify-between "
        >
          <div id="navigation" className="hidden h-full w-full lg:flex">
            <ul className="flex w-full items-center font-semibold md:space-x-4 md:text-[1.2rem] lg:space-x-8 lg:text-[1.5rem] ">
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
          <section className="hidden md:inline-block">
            {data?.user ? (
              <div
                id="logged"
                className="hidden h-full w-full items-center md:flex-row md:gap-y-0 md:space-x-4 lg:flex"
              >
                <div className="font-dm-sans text-[1.25rem] font-bold">{data.user.name}</div>
                <Dropdown placement="bottom-end">
                  <MenuHandler>
                    <ChevronDown className="h-5 w-5 hover:cursor-pointer" />
                  </MenuHandler>
                  <MenuList className="decoration-none flex flex-col space-y-2 rounded-none font-dm-sans hover:border-none lg:w-[240px]">
                    <Link to="/add-story" className="p-1.5 ring-transparent hover:bg-gray-100 hover:ring-transparent">
                      New story
                    </Link>
                    <Link to="/profile" className="p-1.5 ring-transparent hover:bg-gray-100 hover:ring-transparent">
                      Profile
                    </Link>
                    <button onClick={logout} className="inline-flex justify-start p-1.5 hover:bg-gray-100">
                      Logout
                    </button>
                  </MenuList>
                </Dropdown>
              </div>
            ) : (
              <div id="not-logged" className="hidden lg:flex ">
                <div className="flex h-full w-full items-center justify-end font-semibold md:flex-row md:gap-10  md:text-[1.2rem] lg:text-[1.5rem]">
                  <Link to="/login">LOGIN</Link>
                  <Link
                    to="/register"
                    className="cursor-pointer border bg-black px-[56px] py-[9px]  text-white transition duration-100 hover:bg-black/80"
                  >
                    REGISTER
                  </Link>
                </div>
              </div>
            )}
          </section>
          <section className="px-4 lg:hidden">
            <Menu className="h-6 w-6" onClick={toggleDrawer} />
            <Dialog open={open} handler={toggleDrawer} size="xxl">
              <DialogBody className="text-primary">
                <section className="flex flex-col items-end space-y-6">
                  <X className="h-6 w-6" onClick={toggleDrawer} />
                  <div id="navigation" className="flex flex-col">
                    <ul className="flex w-full flex-col items-end space-y-6">
                      {navLinks.map(({ id, name, link }) => (
                        <li
                          key={id}
                          className={`border-b-2  ${pathname === link ? "border-b-black" : "border-b-transparent hover:border-b-black"}`}
                        >
                          <Link
                            to={link}
                            className="font-dm-display text-2xl font-bold tracking-wide text-line"
                            onClick={toggleDrawer}
                          >
                            {name.toUpperCase()}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="h-[1px] w-full bg-line/20" />
                  {data?.user ? (
                    <div id="logged" className="items-end">
                      <div className="flex flex-col items-end space-y-6 text-2xl font-bold tracking-wide text-line">
                        <Link to="/profile" className="font-dm-display" onClick={toggleDrawer}>
                          PROFILE
                        </Link>
                        <button onClick={logout} className="font-dm-display">
                          LOGOUT
                        </button>
                        <Link to="/add-story" className="btn-primary w-full" onClick={toggleDrawer}>
                          New Story
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div id="not-logged" className="items-end">
                      <div className="flex flex-col items-end space-y-6 text-2xl font-bold tracking-wide text-line">
                        <Link to="/login" className="font-dm-display" onClick={toggleDrawer}>
                          LOGIN
                        </Link>
                        <Link to="/register" className="font-dm-display text-line" onClick={toggleDrawer}>
                          REGISTER
                        </Link>
                      </div>
                    </div>
                  )}
                </section>
              </DialogBody>
            </Dialog>
          </section>
        </div>
      </div>
    </>
  );
}

export default Navbar;
