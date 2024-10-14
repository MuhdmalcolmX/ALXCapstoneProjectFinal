function QuizHistory({ history, averageScore, bestScore }) {
    return (
      <div>
        <h2>Quiz History</h2>
        <p>Average Score: {averageScore}</p>
        <p>Best Score: {bestScore}</p>
        <ul>
          {history.map((quiz, index) => (
            <li key={index}>
              {quiz.date}: {quiz.category} - Score: {quiz.score}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default QuizHistory;
  