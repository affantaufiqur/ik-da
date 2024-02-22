import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <main>
      <Navbar />
      <div className="mb-8 h-[1px] w-full bg-black" />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </main>
  );
}
