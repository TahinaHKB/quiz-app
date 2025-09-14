export const getPointsPerQuestion = (difficulty:string, category:string, mode:string) => {
  if (!difficulty || !category) return 0;

  let pointsNiveau, pointsCategorie;

  if (mode === "chrono") {
    switch (difficulty) {
      case "facile":
        pointsNiveau = 4;
        break;
      case "intermediaire":
        pointsNiveau = 6;
        break;
      case "difficile":
        pointsNiveau = 8;
        break;
      default:
        pointsNiveau = 0;
    }
    pointsCategorie = category === "aleatoire" ? 8 : 5;
  } else {
    switch (difficulty) {
      case "facile":
        pointsNiveau = 2;
        break;
      case "intermediaire":
        pointsNiveau = 4;
        break;
      case "difficile":
        pointsNiveau = 6;
        break;
      default:
        pointsNiveau = 0;
    }
    pointsCategorie = category === "aleatoire" ? 5 : 3;
  }
  return pointsNiveau + pointsCategorie;
};

export const GetBonus = (
  difficulty: string,
  category: string,
  mode: string,
  numQuestions: number,
  pourcentage: number = 50
) => {
  return (
    (getPointsPerQuestion(difficulty, category, mode) *
      numQuestions *
      pourcentage) /
    100
  );
};
