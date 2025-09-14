import { NavLink } from "react-router-dom";
import { FaHome, FaPlay, FaTrophy} from "react-icons/fa";

const links = [
  { to: "/", label: "Home", icon: <FaHome />, end: true },
  { to: "/play", label: "Play", icon: <FaPlay /> },
  { to: "/score", label: "Score", icon: <FaTrophy /> },
];

export default function NavBar() {
  return (
    <>
      {/* Sidebar / Dashboard (desktop) */}
      <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 p-6 flex-col hidden md:flex rounded-r-2xl shadow-xl relative">
        {/* Logo / Avatar */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-700 font-bold text-xl">
            QZ
          </div>
          <span className="text-white mt-2 font-semibold">Quiz Master</span>
        </div>

        <nav className="flex flex-col space-y-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 bg-white/20 text-white p-3 rounded-lg font-semibold shadow-inner hover:bg-white/30 transition"
                  : "flex items-center gap-3 text-blue-200 hover:text-white hover:bg-white/10 p-3 rounded-lg transition"
              }
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-6 left-0 w-full text-center">
          <p className="text-blue-200 text-sm">v1.0.0 • © 2025</p>
        </div>
      </aside>

      {/* Bottom navigation pour mobile */}
      <nav className="z-[999] fixed bottom-0 left-0 right-0 bg-gradient-to-t from-blue-700 to-blue-900 shadow-lg md:hidden flex justify-around items-center p-2 rounded-t-xl border-t border-blue-600">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              isActive
                ? "flex flex-col items-center justify-center text-white bg-blue-600/30 p-2 rounded-xl shadow-inner transition-all duration-300"
                : "flex flex-col items-center justify-center text-blue-200 hover:text-white hover:bg-blue-700/20 p-2 rounded-xl transition-colors duration-300"
            }
          >
            <span className="text-base">{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
