import { useState } from 'react';

function QuestionCard({ questions, recordQuizResult, categoryName }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex >= questions.length - 1) {
      recordQuizResult(score, categoryName);
      alert(`Quiz finished! Your score is ${score}`);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null); // Reset selected answer for the next question
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h3>Question {currentQuestionIndex + 1}</h3>
      <p>{currentQuestion.question}</p>
      <div>
        {currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer).map((answer, index) => (
          <button 
            key={index} 
            onClick={() => handleAnswerSelection(answer)} 
            className={selectedAnswer === answer ? 'selected' : ''}
          >
            {answer}
          </button>
        ))}
      </div>
      <button onClick={handleNextQuestion}>Next Question</button>
    </div>
  );
}

export default QuestionCard;
