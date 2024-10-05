function QuizHistory({ history, averageScore, bestScore }) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Quiz History</h2>
        {history.length === 0 ? (
          <p>No quizzes taken yet.</p>
        ) : (
          <>
            <div className="mb-4">
              <p className="font-semibold">Average Score: {averageScore}</p>
              <p className="font-semibold">Best Score: {bestScore}</p>
            </div>
            <ul className="space-y-2">
              {history.map((quiz, index) => (
                <li key={index} className="border p-2 rounded">
                  <p>Date: {quiz.date}</p>
                  <p>Category: {quiz.category}</p>
                  <p>Score: {quiz.score}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }
  
  export default QuizHistory;
  