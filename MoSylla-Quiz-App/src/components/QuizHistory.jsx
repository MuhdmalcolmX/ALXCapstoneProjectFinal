function QuizHistory({ history, averageScore, bestScore }) {
  return (
    <div className="quiz-history-container p-4">
      <h2 className="text-xl font-bold mb-2">Quiz History</h2>
      <p className="mb-2">Average Score: <strong>{averageScore}</strong></p>
      <p className="mb-4">Best Score: <strong>{bestScore}</strong></p>

      {history.length > 0 ? (
        <ul className="space-y-2">
          {history.map((quiz, index) => (
            <li key={index} className="p-2 border rounded-lg bg-gray-100">
              <p><strong>{new Date(quiz.date).toLocaleString()}</strong></p>
              <p>Category: <strong>{quiz.category}</strong></p>
              <p>Score: <strong>{quiz.score}</strong></p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No quizzes taken yet.</p>
      )}
    </div>
  );
}

export default QuizHistory;
