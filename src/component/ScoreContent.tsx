import { useEffect, useState } from "react";

type GameHistory = {
  date: string;
  mode: string;
  category: string;
  difficulty: string;
  numQuestions: number;
  score: string;
  pointsWon: number;
};

export default function ScoreContent() {
  const [totalPoints, setTotalPoints] = useState(0);
  const [history, setHistory] = useState<GameHistory[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const storedPoints = parseInt(localStorage.getItem("quizPoints") || "0");
    const storedHistory = JSON.parse(
      localStorage.getItem("quizHistory") || "[]"
    );

    setTotalPoints(storedPoints);
    setHistory(storedHistory);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("quizPoints");
    localStorage.removeItem("quizHistory");
    setTotalPoints(0);
    setHistory([]);
    setShowConfirm(false);
    setToastMessage("✅ History cleared successfully!");
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-10 bg-gradient-to-br from-blue-50 via-white to-pink-50 w-full">
      {/* Total Points */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center w-full max-w-2xl mb-10">
        <h1 className="text-4xl font-extrabold text-blue-700">Scoreboard</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-800">
          Total Points:{" "}
          <span className="text-green-600 font-bold">{totalPoints}</span>
        </p>
      </div>

      {/* Game History Cards */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-4xl relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">Game History</h2>

          {history.length > 0 && (
            <button
              onClick={() => setShowConfirm(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
            >
              Clear
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <p className="text-center text-gray-500">No history yet 🎮</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {history
              .slice()
              .reverse()
              .map((game, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-pink-50 border border-gray-200 p-5 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  <p className="text-sm text-gray-500">{game.date}</p>
                  <h3 className="text-lg font-bold text-gray-800 mt-1">
                    {game.category}
                  </h3>
                  <p className="text-gray-600 capitalize">
                    Mode: <span className="font-medium">{game.mode}</span>
                  </p>
                  <p className="text-gray-600 capitalize">
                    Difficulty:{" "}
                    <span className="font-medium">{game.difficulty}</span>
                  </p>
                  <p className="text-gray-600">
                    Questions:{" "}
                    <span className="font-medium">{game.numQuestions}</span>
                  </p>
                  <p className="text-gray-800 font-semibold mt-2">
                    Score: {game.score}
                  </p>
                  <p className="text-green-600 font-bold">
                    +{game.pointsWon} points
                  </p>
                </div>
              ))}
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirm && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl z-50 text-center">
              <h3 className="text-xl font-bold text-gray-700 mb-4">
                Are you sure you want to clear the history?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={clearHistory}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Yes, clear
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}

        {/* Success Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
            {toastMessage}
          </div>
        )}
      </div>
    </main>
  );
}
