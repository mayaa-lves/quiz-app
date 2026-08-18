// app/index.tsx

import { useState } from "react";
import { Stack } from "expo-router";
import QuizScreen from "../components/QuizScreen";
import ResultScreen from "../components/ResultScreen";
import PaginaInicial from "../components/PaginaInicial"; // Importe seu novo componente aqui!
import questions from "../questions.json";

export default function HomePage() {
  // Novo estado para controlar se o quiz já foi iniciado ou não
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionPress = (option: string) => {
    if (option === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption(option);
    setIsOptionsDisabled(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsOptionsDisabled(false);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handlePlayAgain = () => {
    setIsQuizFinished(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsOptionsDisabled(false);
    setScore(0);
    setIsQuizStarted(true); // Reinicia já direto no quiz
  };

  // Função para dar início ao jogo ao clicar no botão da PaginaInicial
  const handleStartQuiz = () => {
    setIsQuizStarted(true);
  };

  return (
    <>
      {/* Remove o cabeçalho/barra superior em todas as telas */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Lógica de navegação entre as telas */}
      {!isQuizStarted ? (
        <PaginaInicial onStartQuiz={handleStartQuiz} />
      ) : isQuizFinished ? (
        <ResultScreen
          score={score}
          totalQuestions={questions.length}
          onPlayAgain={handlePlayAgain}
        />
      ) : (
        <QuizScreen
          currentQuestion={currentQuestion}
          selectedOption={selectedOption}
          isOptionsDisabled={isOptionsDisabled}
          onOptionPress={handleOptionPress}
          onNextQuestion={handleNextQuestion}
        />
      )}
    </>
  );
}