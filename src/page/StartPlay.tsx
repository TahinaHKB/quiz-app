import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { categories } from "../data/Category";
import { GetBonus, getPointsPerQuestion } from "../data/GetPoint";
import { saveGameResult } from "../data/SaveData";

export type TriviaQuestion = {
  category: string;
  id: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: { text: string };
  tags: string[];
  type: string;
  difficulty: "easy" | "medium" | "hard";
  regions: string[];
  isNiche: boolean;
};

// Décoder les entités HTML
const decodeHtml = (html: string) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

export default function StartPlay() {
  const location = useLocation();
  const navigate = useNavigate();
  const { mode, category, difficulty, numQuestions, selectedCategoryId } =
    location.state || {};

  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [secondPerQuestion, setSecondPerQuestion] = useState(15);

  const questionRef = useRef<HTMLDivElement>(null);

  const translate = (dif: string) => {
    switch (dif) {
      case "facile":
        setSecondPerQuestion(10);
        return "easy";
      case "intermediaire":
        setSecondPerQuestion(13);
        return "medium";
      case "difficile":
        setSecondPerQuestion(15);
        return "hard";
      default:
        return dif;
    }
  };

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      let apiUrl = `https://the-trivia-api.com/v2/questions?limit=${numQuestions}`;
      if (category === "non-aleatoire" && selectedCategoryId) {
        const selectedCategory = categories.find(
          (c) => c.id === parseInt(selectedCategoryId)
        );
        if (selectedCategory) {
          apiUrl += `&categories=${encodeURIComponent(selectedCategory.name)}`;
        }
      }
      if (difficulty)
        apiUrl += `&difficulty=${translate(difficulty.toLowerCase())}`;

      try {
        const res = await fetch(apiUrl);
        const data: TriviaQuestion[] = await res.json();
        setQuestions(data);
        setTimeLeft(data.length * secondPerQuestion);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [category, difficulty, numQuestions, selectedCategoryId]);

  // Timer
  useEffect(() => {
    if (mode !== "chrono" || quizFinished || loading) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setQuizFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [mode, quizFinished, loading]);

  // Shuffle answers
  useEffect(() => {
    if (questions.length > 0) {
      const current = questions[currentIndex];
      const answers = [...current.incorrectAnswers, current.correctAnswer].sort(
        () => Math.random() - 0.5
      );
      setShuffledAnswers(answers);
      // Scroll automatique vers la question à chaque nouvelle question
      setTimeout(() => {
        questionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    }
  }, [currentIndex, questions]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowCorrect(true);
    if (answer === questions[currentIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowCorrect(false);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  // Points animation
  useEffect(() => {
    if (!quizFinished) return;
    const finalPoints =
      score * getPointsPerQuestion(difficulty, category, mode) +
      (score === questions.length && timeLeft > 0
        ? GetBonus(difficulty, category, mode, numQuestions)
        : 0);

    let start = 0;
    const step = Math.ceil(finalPoints / 50);
    const anim = setInterval(() => {
      start += step;
      if (start >= finalPoints) {
        start = finalPoints;
        clearInterval(anim);
      }
      setAnimatedScore(start);
    }, 20);

    return () => clearInterval(anim);
  }, [quizFinished]);

  useEffect(() => {
    if (quizFinished) {
      const pointsWon =
        score * getPointsPerQuestion(difficulty, category, mode);
      const totalPointsWon =
        score === questions.length && timeLeft > 0
          ? pointsWon + GetBonus(difficulty, category, mode, numQuestions)
          : pointsWon;

      saveGameResult(
        score,
        questions.length,
        totalPointsWon,
        difficulty,
        category,
        mode,
        numQuestions,
        selectedCategoryId
      );
    }
  }, [quizFinished]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen p-4">
        <p className="text-xl font-semibold">Loading questions...</p>
      </div>
    );

  if (!questions.length)
    return (
      <div className="flex items-center justify-center h-screen p-4">
        <p className="text-red-500 text-center">
          No questions found for these parameters.
        </p>
      </div>
    );

  const currentQuestion: TriviaQuestion = questions[currentIndex];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <main className="flex-1 flex flex-col items-center justify-start p-4 md:p-10 bg-gradient-to-br from-blue-50 via-white to-pink-50 min-h-screen">
      <div className="bg-white p-6 md:p-12 rounded-3xl shadow-2xl w-full max-w-md md:max-w-3xl mx-auto text-center space-y-6 overflow-visible">
        <h2 className="text-2xl md:text-4xl font-extrabold text-blue-700 break-words">
          Quiz in Progress
        </h2>

        {/* Timer */}
        {mode === "chrono" && !quizFinished && (
          <div className="text-center text-lg md:text-xl font-bold text-red-600">
            Time Left: {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </div>
        )}

        {/* Settings */}
        <div className="bg-gray-100 p-4 rounded-xl text-left text-gray-700 space-y-2 break-words">
          <p>
            <strong>Mode:</strong>{" "}
            {mode === "chrono" ? "With Timer" : "Without Timer"}
          </p>
          <p>
            <strong>Category:</strong>{" "}
            {category
              ? category === "aleatoire"
                ? "Random"
                : selectedCategoryId
                ? categories.find((c) => c.id === parseInt(selectedCategoryId))
                    ?.name
                : "Selected"
              : "—"}
          </p>
          <p>
            <strong>Difficulty:</strong>{" "}
            {difficulty
              ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
              : "—"}
          </p>
          {mode === "chrono" && !quizFinished && (
            <p>
              <strong>Questions remaining:</strong>{" "}
              {questions.length - currentIndex}
            </p>
          )}
        </div>

        {/* Question */}
        {!quizFinished && (
          <div ref={questionRef} className="mt-4 text-left w-full break-words">
            <p className="font-semibold text-lg md:text-xl break-words text-blue-700">
              {currentIndex + 1}. {decodeHtml(currentQuestion.question.text)}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {shuffledAnswers.map((ans) => (
                <button
                  key={ans}
                  onClick={() => handleAnswer(ans)}
                  disabled={!!selectedAnswer}
                  className={`p-3 rounded-xl text-left break-words hover:bg-blue-200 disabled:opacity-50 transition-colors ${
                    showCorrect && ans === currentQuestion.correctAnswer
                      ? "bg-green-300"
                      : "bg-blue-100"
                  }`}
                >
                  {decodeHtml(ans)}
                </button>
              ))}
            </div>

            {selectedAnswer && (
              <div className="mt-4 font-bold space-y-1 break-words">
                <p className="text-blue-700">
                  Your choice:{" "}
                  <span
                    className={
                      selectedAnswer === currentQuestion.correctAnswer
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {decodeHtml(selectedAnswer)}
                  </span>
                </p>
                <p className="text-blue-700">
                  Correct answer:{" "}
                  <span className="text-green-600">
                    {decodeHtml(currentQuestion.correctAnswer)}
                  </span>
                </p>
                <button
                  onClick={handleNext}
                  className="mt-2 w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}

        {/* Final Score */}
        {quizFinished && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-md bg-gradient-to-br from-white via-blue-50 to-pink-50 p-8 rounded-3xl shadow-2xl text-center space-y-6 z-50 animate-fadeIn break-words">
              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 break-words">
                Quiz Finished!
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Time Remaining: {timeLeft} seconds
              </p>
              <p className="text-xl font-semibold text-gray-800">
                You answered {score} / {questions.length} questions correctly
              </p>
              <p className="text-2xl md:text-3xl font-bold text-blue-600">
                {animatedScore} points
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-4 w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
              >
                Back to Menu
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
