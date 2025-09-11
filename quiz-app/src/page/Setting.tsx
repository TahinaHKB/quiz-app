import NavBar from "../component/NavBar";
import HomeContent from "../component/HomeContent";

export default function Setting() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 w-full overflow-x-hidden">
        <NavBar />
      {/* Main content */}
        <HomeContent titre="Setting" />
    </div>
  );
}
