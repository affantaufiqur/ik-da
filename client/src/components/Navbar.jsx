function Navbar() {
  return (
    <>
      <div id="navbar" className=" flex gap-10 items-center w-full h-16 bg-slate-400 px-20">
        <div id="logo" className="flex items-center justify-center w-40 h-4/5 bg-white rounded-md">
          <div>Logo</div>
        </div>
        <div id="navigation" className="w-1/5 h-4/5 ">
          <ul className="flex flex-row justify-between items-center w-full h-full text-2xl px-10">
            <li className="hover:translate-y-[-3px] transition duration-100">Popular</li>
            <li className="hover:translate-y-[-3px] transition duration-100">Latest Added </li>
          </ul>
        </div>
        <div id="search-bar" className="w-1/5 h-4/5 bg-slate-400 justify-center grow">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            className=" h-full w-full bg-white text-2xl px-5 rounded-md"
          />
        </div>
        <div id="identification" className="w-1/5 h-4/5 bg-slate-400">
          <ul className="flex flex-row gap-10 items-center w-full h-full text-2xl px-11 ">
            <li className="hover:translate-y-[-3px] transition duration-100">Login</li>
            <li className="hover:translate-y-[-3px] transition duration-100">Register</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
