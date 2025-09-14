import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/Category";
import { GetBonus, getPointsPerQuestion } from "../data/GetPoint";

export default function ChooseGame() {
  const navigate = useNavigate();
  const [mode] = useState("chrono"); // "chrono" or "without-chrono"
  const [category, setCategory] = useState("aleatoire"); // "aleatoire" or "non-aleatoire"
  const [selectedCategoryId, setSelectedCategoryId] = useState(""); // ID if "non-aleatoire"
  const [difficulty, setDifficulty] = useState("facile"); // "facile", "intermediaire", "difficile"
  const [numQuestions, setNumQuestions] = useState(10);

  const canStart = () => {
    if (!mode || !category || !difficulty) return false;
    if (category === "non-aleatoire" && !selectedCategoryId) return false;
    if (
      mode === "chrono" &&
      (!numQuestions || numQuestions < 5 || numQuestions > 20)
    )
      return false;
    return true;
  };

  const bonusChrono =
    mode === "chrono" ? GetBonus(difficulty, category, mode, numQuestions) : 0;

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-10 bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl w-full max-w-md md:max-w-3xl mx-auto text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">
          Prepare Your Quiz
        </h2>
        <p className="text-gray-600 text-lg md:text-xl">
          Choose your rules before starting
        </p>

        {/* Number of questions */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-700">QUESTIONS</h3>
          <div className="mt-2">
            <label className="text-gray-600" htmlFor="nb">
              Number of questions (5 to 20):
            </label>
            <input
              type="number"
              min={5}
              max={50}
              value={numQuestions}
              id="nb"
              onChange={(e) => {
                let value = parseInt(e.target.value, 10);
                if (isNaN(value) || value < 5) value = 5;
                if (isNaN(value) || value > 20) value = 20;
                setNumQuestions(value);
              }}
              className="ml-2 px-2 py-1 border rounded w-16 text-center"
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-700">CATEGORY</h3>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setCategory("non-aleatoire")}
              className={`px-4 py-2 rounded-lg border-2 ${
                category === "non-aleatoire"
                  ? "border-indigo-600 bg-indigo-100"
                  : "border-gray-300"
              }`}
            >
              Chosen
            </button>
            <button
              onClick={() => setCategory("aleatoire")}
              className={`px-4 py-2 rounded-lg border-2 ${
                category === "aleatoire"
                  ? "border-indigo-600 bg-indigo-100"
                  : "border-gray-300"
              }`}
            >
              Random
            </button>
          </div>

          {category === "non-aleatoire" && (
            <div className="mt-2">
              <label className="text-gray-600 mr-2" htmlFor="cat">
                Select a category:
              </label>
              <select
                id="cat"
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="">-- Select --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Difficulty */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-700">DIFFICULTY</h3>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setDifficulty("facile")}
              className={`px-4 py-2 rounded-lg border-2 ${
                difficulty === "facile"
                  ? "border-green-600 bg-green-100"
                  : "border-gray-300"
              }`}
            >
              Easy
            </button>
            <button
              onClick={() => setDifficulty("intermediaire")}
              className={`px-4 py-2 rounded-lg border-2 ${
                difficulty === "intermediaire"
                  ? "border-yellow-600 bg-yellow-100"
                  : "border-gray-300"
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setDifficulty("difficile")}
              className={`px-4 py-2 rounded-lg border-2 ${
                difficulty === "difficile"
                  ? "border-red-600 bg-red-100"
                  : "border-gray-300"
              }`}
            >
              Hard
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-100 p-4 rounded-lg text-left text-gray-700 space-y-1">
          <h4 className="font-semibold mb-2">Selected rules:</h4>
          <p>Questions: {`${numQuestions} `}</p>
          <p>
            Category:{" "}
            {category
              ? category === "aleatoire"
                ? "Random"
                : selectedCategoryId
                ? categories.find((c) => c.id === parseInt(selectedCategoryId))
                    ?.name
                : "Chosen"
              : "—"}
          </p>
          <p>
            Difficulty:{" "}
            {difficulty
              ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
              : "—"}
          </p>
          <p>
            Points per question:{" "}
            {getPointsPerQuestion(difficulty, category, mode)}
          </p>
          {mode === "chrono" && <p>Perfect bonus: {bonusChrono} points</p>}
        </div>

        {/* Start button */}
        <div className="flex justify-center">
          <button
            disabled={!canStart()}
            onClick={() =>
              navigate("/go", {
                state: {
                  mode,
                  category,
                  difficulty,
                  numQuestions,
                  selectedCategoryId,
                },
              })
            }
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition transform hover:scale-105"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </main>
  );
}
