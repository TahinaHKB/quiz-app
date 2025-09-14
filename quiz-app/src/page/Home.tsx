import NavBar from "../component/NavBar";
import HomeContent from "../component/HomeContent";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 w-full overflow-x-hidden">
        <NavBar />
      {/* Main content */}
        <HomeContent />
    </div>
  );
}
