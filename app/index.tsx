// app/index.tsx

import { useState } from "react";
import { Stack } from "expo-router";
import QuizScreen from "../components/QuizScreen";
import ResultScreen from "../components/ResultScreen";
import PaginaInicial from "../components/PaginaInicialQuiz";
import questionsData from "../questions.json";

// Função para embaralhar um array (Algoritmo Fisher-Yates)
const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function HomePage() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [questions, setQuestions] = useState(questionsData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleStartQuiz = () => {
    setQuestions(shuffleArray(questionsData)); // Embaralha ao iniciar
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsOptionsDisabled(false);
    setIsQuizFinished(false);
    setIsQuizStarted(true);
  };

  const handleOptionPress = (option: string) => {
    if (option === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setSelectedOption(option);
    setIsOptionsDisabled(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsOptionsDisabled(false);
    } else {
      setIsQuizFinished(true);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      {!isQuizStarted ? (
        <PaginaInicial onStartQuiz={handleStartQuiz} />
      ) : isQuizFinished ? (
        <ResultScreen
          score={score}
          totalQuestions={questions.length}
          onPlayAgain={handleStartQuiz}
        />
      ) : (
        <QuizScreen
          currentQuestion={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          selectedOption={selectedOption}
          isOptionsDisabled={isOptionsDisabled}
          onOptionPress={handleOptionPress}
          onNextQuestion={handleNextQuestion}
        />
      )}
    </>
  );
}