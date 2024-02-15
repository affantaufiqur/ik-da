import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Tes />} />
      </Route>
    </Routes>
  );
}

function Home() {
  return (
    <div>
      {" akmklal "}
      <Outlet />
    </div>
  );
}
