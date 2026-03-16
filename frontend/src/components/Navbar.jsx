import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { isAuth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAuth) return null;

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-xl font-bold tracking-wide">
          Employee Dashboard
        </h1>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/list" className="hover:text-blue-400 transition">
            Employee List
          </Link>

          <Link to="/analytics" className="hover:text-blue-400 transition">
            Analytics
          </Link>

          <button
            onClick={handleLogout}
            className="bg-blue-500 px-5 py-2 rounded hover:bg-red-600 transition cursor-pointer"
          >
            Logout
          </button>
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 text-sm bg-gray-500">

          <Link
            to="/list"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-400"
          >
            Employee List
          </Link>

          <Link
            to="/analytics"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-400"
          >
            Analytics
          </Link>

          <button
            onClick={handleLogout}
            className="bg-blue-500 px-5 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>
      )}
    </nav>
  );
}