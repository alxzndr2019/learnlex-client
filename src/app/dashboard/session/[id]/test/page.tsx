"use client";

import { useState } from "react";
import Link from "next/link";

interface Question {
  id: number;
  text: string;
  choices: string[];
  correctAnswer: number;
  explanation: string;
}

const QuestionProgress = ({
  current,
  total,
  score,
}: {
  current: number;
  total: number;
  score: number;
}) => (
  <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
    <div className="flex justify-between items-center">
      <div className="space-y-1">
        <p className="text-sm text-gray-500">Question</p>
        <p className="text-2xl font-bold">
          {current} <span className="text-gray-400">/ {total}</span>
        </p>
      </div>
      <div className="space-y-1 text-right">
        <p className="text-sm text-gray-500">Score</p>
        <p className="text-2xl font-bold text-[#8811f0]">{score}%</p>
      </div>
    </div>
    <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-[#8811f0] rounded-full transition-all duration-500"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  </div>
);

const ChoiceButton = ({
  choice,
  onClick,
  status,
}: {
  choice: string;
  onClick: () => void;
  status?: "success" | "error" | "default";
}) => {
  const getStatusClasses = () => {
    switch (status) {
      case "success":
        return "border-green-500 bg-green-50 text-green-700";
      case "error":
        return "border-red-500 bg-red-50 text-red-700";
      default:
        return "border-gray-200 hover:border-[#8811f0] hover:bg-[#8811f0]/5";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${getStatusClasses()}`}
    >
      {choice}
    </button>
  );
};

const ExplanationAccordion = ({
  explanation,
  isVisible,
}: {
  explanation: string;
  isVisible: boolean;
}) =>
  isVisible ? (
    <div className="mt-8 p-6 bg-[#8811f0]/5 rounded-xl">
      <h3 className="font-bold mb-2">Explanation</h3>
      <p className="text-gray-600">{explanation}</p>
    </div>
  ) : null;

export default function TestPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  // Mock questions - replace with actual data
  const questions: Question[] = [
    {
      id: 1,
      text: "What's the output of console.log(typeof null)?",
      choices: ['"null"', '"object"', '"undefined"', '"boolean"'],
      correctAnswer: 1,
      explanation:
        'In JavaScript, typeof null returns "object". This is a known language quirk that has persisted for historical reasons.',
    },
    {
      id: 2,
      text: "Which of these is NOT a valid way to declare a variable in JavaScript?",
      choices: ["let x = 5;", "const x = 5;", "var x = 5;", "variable x = 5;"],
      correctAnswer: 3,
      explanation:
        "JavaScript has three ways to declare variables: var, let, and const. 'variable' is not a valid keyword.",
    },
    // Add more questions as needed
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const hasAnswered = selectedAnswers[currentQuestionIndex] !== undefined;

  const calculateScore = () => {
    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === questions[index].correctAnswer
    ).length;
    return Math.round((correctAnswers / selectedAnswers.length) * 100) || 0;
  };

  const handleAnswerSelect = (choiceIndex: number) => {
    if (hasAnswered) return;

    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = choiceIndex;
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuestionProgress
          current={currentQuestionIndex + 1}
          total={questions.length}
          score={calculateScore()}
        />

        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold mb-6">{currentQuestion.text}</h2>

          <div className="space-y-4">
            {currentQuestion.choices.map((choice, index) => (
              <ChoiceButton
                key={index}
                choice={choice}
                onClick={() => handleAnswerSelect(index)}
                status={
                  hasAnswered
                    ? index === currentQuestion.correctAnswer
                      ? "success"
                      : index === selectedAnswers[currentQuestionIndex]
                      ? "error"
                      : "default"
                    : "default"
                }
              />
            ))}
          </div>

          <ExplanationAccordion
            explanation={currentQuestion.explanation}
            isVisible={showExplanation}
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentQuestionIndex === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-[#8811f0] hover:bg-gray-50"
            }`}
          >
            Previous
          </button>
          {currentQuestionIndex === questions.length - 1 ? (
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-lg font-medium bg-[#8811f0] text-white hover:bg-[#7700d6] transition-colors"
            >
              Finish Test
            </Link>
          ) : (
            <button
              onClick={handleNext}
              disabled={!hasAnswered}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                !hasAnswered
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-[#8811f0] text-white hover:bg-[#7700d6]"
              }`}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
