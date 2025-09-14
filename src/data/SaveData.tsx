import { categories } from "./Category";

// Sauvegarde du résultat d'une partie
export const saveGameResult = (
  score: number,
  totalQuestions: number,
  pointsWon: number,
  difficulty: string,
  category: string,
  mode: string,
  numQuestions: number, 
  selectedCategoryId: string
) => {
  // --- 1. Mettre à jour les points totaux ---
  const currentPoints = parseInt(localStorage.getItem("quizPoints") || "0");
  const newTotalPoints = currentPoints + pointsWon;
  localStorage.setItem("quizPoints", newTotalPoints.toString());

  // --- 2. Ajouter l'historique ---
  const history = JSON.parse(localStorage.getItem("quizHistory") || "[]");

  if (category === "non-aleatoire" && selectedCategoryId) {
    const selectedCategory = categories.find(
      (c) => c.id === parseInt(selectedCategoryId)
    );
    if (selectedCategory) {
      category = selectedCategory.name;
    }
  }

  const newEntry = {
    date: new Date().toLocaleString(),
    mode,
    category,
    difficulty,
    numQuestions,
    score: `${score}/${totalQuestions}`,
    pointsWon,
  };

  history.push(newEntry);

  localStorage.setItem("quizHistory", JSON.stringify(history));
};
