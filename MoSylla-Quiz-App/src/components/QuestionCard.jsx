import { useState } from 'react';

function QuestionCard({ questions, recordQuizResult, categoryName }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');

  const currentQuestion = questions[currentQuestionIndex];
  const shuffledAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
    .sort(() => Math.random() - 0.5); // Shuffle answers

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correct_answer) {
      setScore(score + 1);
      setFeedback('Correct!');
    } else {
      setFeedback('Incorrect!');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null); // Reset the selected answer for the next question
      setFeedback(''); // Reset feedback for the new question
    } else {
      recordQuizResult(score, categoryName); // Ensure categoryName is passed correctly
      alert(`Quiz finished! Your score is ${score}`);
    }
  };

  return (
    <div>
      <h3>Question {currentQuestionIndex + 1}</h3>
      <p>{currentQuestion.question}</p>
      <div>
        {shuffledAnswers.map((answer, index) => (
          <button 
            key={index} 
            onClick={() => handleAnswerSelection(answer)} 
            className={selectedAnswer === answer ? 'selected' : ''}
          >
            {answer}
          </button>
        ))}
      </div>
      {feedback && <p>{feedback}</p>} {/* Display feedback */}
      <button 
        onClick={handleNextQuestion}
        disabled={!selectedAnswer} // Disable "Next Question" if no answer is selected
      >
        Next Question
      </button>
    </div>
  );
}

export default QuestionCard;
