import NavBar from "../component/NavBar";
import ScoreContent from "../component/ScoreContent";

export default function Score() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 w-full overflow-x-hidden">
        <NavBar />
      {/* Main content */}
        <ScoreContent />
    </div>
  );
}
