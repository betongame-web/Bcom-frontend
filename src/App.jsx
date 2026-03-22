import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SelectRole from "./pages/SelectRole";
import Profile from "./pages/Profile";
import Deposit from "./pages/Deposit";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/select-role" element={<SelectRole />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/deposit" element={<Deposit />} />
      </Routes>
    </BrowserRouter>
  );
}