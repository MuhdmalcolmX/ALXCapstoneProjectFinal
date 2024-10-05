function QuizHistory({ history }) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Quiz History</h2>
        {history.length === 0 ? (
          <p>No quizzes taken yet.</p>
        ) : (
          <ul className="space-y-2">
            {history.map((quiz, index) => (
              <li key={index} className="border p-2 rounded">
                <p>Date: {quiz.date}</p>
                <p>Category: {quiz.category}</p>
                <p>Score: {quiz.score}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  
  export default QuizHistory;
  