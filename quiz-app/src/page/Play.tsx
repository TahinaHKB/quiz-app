import NavBar from "../component/NavBar";
import ChooseGame from "../component/ChooseGame";

export default function Play() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 w-full overflow-x-hidden">
        <NavBar />
      {/* Main content */}
        <ChooseGame />
    </div>
  );
}
