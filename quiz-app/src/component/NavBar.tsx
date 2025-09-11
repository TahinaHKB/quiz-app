import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Accueil", end: true },
  { to: "/play", label: "Play" },
  { to: "/score", label: "Score" },
  { to: "/parametre", label: "Paramètre" },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "bg-blue-600 text-white p-2 rounded-lg shadow-md transition-colors"
    : "text-white hover:text-blue-600 hover:bg-gray-200 p-2 rounded-lg transition-colors";


export default function NavBar() {
  return (
    <>
      {/* Sidebar / Dashboard (desktop) */}
      
      <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 p-6 flex-col hidden md:flex rounded-r-2xl shadow-xl">
  <h1 className="text-2xl font-bold mb-10 text-white text-center">Quiz Dashboard</h1>

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
        {/* Icône à gauche (exemple) */}
        <span>{link.label}</span>
      </NavLink>
    ))}
  </nav>
</aside>


      {/* Bottom navigation pour mobile */}
<nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-blue-700 to-blue-900 shadow-lg md:hidden flex justify-around items-center p-2 rounded-t-xl border-t border-blue-600">
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
      {/* Icône Material (facultatif) */}
      <span className="text-base">{link.label}</span>
    </NavLink>
  ))}
</nav>

    </>
  );
}
