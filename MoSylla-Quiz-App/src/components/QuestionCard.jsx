import { useState } from 'react';

function QuestionCard({ questions, recordQuizResult, category }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correct_answer) {
      setScore(score + 1);
      setFeedbackMessage('Correct!');
    } else {
      setFeedbackMessage(`Incorrect! The correct answer was: ${currentQuestion.correct_answer}`);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setFeedbackMessage('');
    } else {
      recordQuizResult(score, category);  // Record the quiz result
      setShowResult(true);  // Show final score at the end
    }
  };

  if (showResult) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Quiz Finished!</h2>
        <p className="text-xl mb-4">Your score: {score} out of {questions.length}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">{currentQuestion.question}</h3>

      <div className="mb-4">
        {currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer).sort().map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(answer)}
            className={`block w-full p-2 my-2 border rounded ${
              selectedAnswer === answer
                ? answer === currentQuestion.correct_answer
                  ? 'bg-green-500'
                  : 'bg-red-500'
                : 'bg-gray-200'
            }`}
            disabled={selectedAnswer !== null}
          >
            {answer}
          </button>
        ))}
      </div>

      {feedbackMessage && (
        <div className="mb-4 text-lg font-semibold">
          {feedbackMessage}
        </div>
      )}

      {selectedAnswer && (
        <button
          onClick={handleNextQuestion}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Next Question
        </button>
      )}
    </div>
  );
}

export default QuestionCard;
