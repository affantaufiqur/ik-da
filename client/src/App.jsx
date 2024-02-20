import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <main>
      <Navbar />
      <div className="mb-8 w-full h-[1px] bg-black" />
      <Outlet />
    </main>
  );
}
