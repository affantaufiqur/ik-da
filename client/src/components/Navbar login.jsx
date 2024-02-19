function Navbar() {
  return (
    <>
      <div
        id="navbar"
        className=" flex gap-10 items-center w-full h-[111px] bg-[#EFEDEE] border border-black border-b-2"
      >
        <div id="navigation" className="w-1/2 h-full ">
          <div className="flex flex-row gap-20 items-center w-full h-full text-[1.5rem] font-semibold px-10">
            <div id="bell-notification"></div>
            <div id="user-name"></div>
            <div id="dropdown"></div>
          </div>
          {/* <ul className="flex flex-row gap-20 items-center w-full h-full text-[1.5rem] font-semibold px-10">
            <li className="hover:translate-y-[-3px] transition duration-100 cursor-pointer">Popular</li>
            <li className="hover:translate-y-[-3px] transition duration-100 cursor-pointer">Latest Added </li>
            <li className="hover:translate-y-[-3px] transition duration-100 cursor-pointer">Random </li>
          </ul> */}
        </div>
        <div id="identification" className="w-1/2 h-4/5 ">
          <ul className="flex flex-row gap-10 items-center w-full h-full text-2xl px-11 justify-end">
            <li className="hover:translate-y-[-3px] transition duration-100 cursor-pointer">Login</li>
            <li className="hover:translate-y-[-3px] transition duration-100 cursor-pointer border border-[#472316] bg-[#EAF954] rounded-[24px] px-[56px] py-[9px]">
              Register
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
