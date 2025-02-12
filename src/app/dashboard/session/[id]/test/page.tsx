"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Section from "../../../_components/Section";
import { sessionApi } from "../../../../../store/api/sessionApi";

export default function TestPage() {
  const params = useParams();
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const { data: testResults } = sessionApi.useGetTestResultsQuery(
    params.id as string,
    {
      skip: !isComplete,
    }
  );

  const [submitAnswer, { isLoading: isSubmitting }] =
    sessionApi.useSubmitAnswerMutation();
  const { data: session } = sessionApi.useGetSessionQuery(params.id as string);

  if (!session) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-white mb-4">
          Session not found
        </h1>
        <p className="text-white/70 mb-8">
          This session might have been deleted or doesn&apos;t exist.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-[#ff6b00] text-white px-6 py-3 rounded-lg hover:bg-[#ff8533] transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    if (currentQuestion < session.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleCheck = async () => {
    if (selectedAnswer === null) return;

    try {
      const result = await submitAnswer({
        sessionId: session.id,
        body: {
          questionId: session.questions[currentQuestion].id,
          answer: selectedAnswer,
        },
      }).unwrap();

      if (result.correct) {
        setScore(score + 1);
      }
      setShowFeedback(true);
    } catch (error) {
      console.error("Failed to submit answer:", error);
    }
  };

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <Section>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">
              Test Complete!
            </h1>
            <p className="text-xl text-white/70 mb-8">
              You scored {score} out of {session.questions.length}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-[#ff6b00] text-white rounded-lg font-medium hover:bg-[#ff8533] transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push(`/dashboard/session/${session.id}`)}
                className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
              >
                Back to Session
              </button>
            </div>
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Section>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Knowledge Check</h1>
            <p className="text-white/70">
              Question {currentQuestion + 1} of {session.questions.length}
            </p>
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-lg">
            <span className="text-white/70">Score: </span>
            <span className="text-white font-medium">{score}</span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl text-white mb-6">
            {session.questions[currentQuestion].text}
          </h2>
          <div className="space-y-4">
            {session.questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${
                  selectedAnswer === index
                    ? showFeedback
                      ? index ===
                        session.questions[currentQuestion].correctAnswer
                        ? "bg-green-500/20 border-green-500"
                        : "bg-red-500/20 border-red-500"
                      : "bg-[#ff6b00]/20 border-[#ff6b00]"
                    : "bg-black/30 border-white/10 hover:border-white/30"
                } ${
                  showFeedback &&
                  index === session.questions[currentQuestion].correctAnswer
                    ? "bg-green-500/20 border-green-500"
                    : ""
                }`}
              >
                <span className="text-white">{option}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          {showFeedback ? (
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="px-6 py-3 bg-[#ff6b00] text-white rounded-lg font-medium hover:bg-[#ff8533] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === session.questions.length - 1
                ? "Finish"
                : "Next"}
            </button>
          ) : (
            <button
              onClick={handleCheck}
              disabled={selectedAnswer === null || isSubmitting}
              className="px-6 py-3 bg-[#ff6b00] text-white rounded-lg font-medium hover:bg-[#ff8533] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Checking..." : "Check Answer"}
            </button>
          )}
        </div>
      </Section>
    </div>
  );
}
