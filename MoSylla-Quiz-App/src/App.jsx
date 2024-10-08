import { useState } from 'react';
import axios from 'axios';
import QuizStart from './components/QuizStart';
import QuestionCard from './components/QuestionCard';
import QuizHistory from './components/QuizHistory';

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [quizHistory, setQuizHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query

  const startQuiz = async (category, difficulty) => {
    setLoading(true);
    setErrorMessage(''); // Reset error message
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
      );
      if (response.data.results.length === 0) {
        throw new Error('No questions found for the selected category and difficulty.');
      }
      setQuestions(response.data.results);
      setQuizStarted(true);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setErrorMessage(error.message || 'Failed to fetch quiz questions. Please try again later.');
    }
    setLoading(false);
  };

  const recordQuizResult = (score, category) => {
    const newQuiz = {
      date: new Date().toLocaleString(),
      score,
      category,
    };
    setQuizHistory((prevHistory) => [...prevHistory, newQuiz]);
  };

  const calculateAverageScore = () => {
    if (quizHistory.length === 0) return 0;
    const totalScore = quizHistory.reduce((total, quiz) => total + quiz.score, 0);
    return (totalScore / quizHistory.length).toFixed(2);
  };

  const getBestScore = () => {
    if (quizHistory.length === 0) return 0;
    return Math.max(...quizHistory.map(quiz => quiz.score));
  };

  // Search functionality
  const filteredHistory = quizHistory.filter(quiz =>
    quiz.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Quiz History</h2>
        <input
          type="text"
          placeholder="Search quizzes by category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        {filteredHistory.length === 0 ? (
          <p>No quizzes found matching your search.</p>
        ) : (
          <>
            <div className="mb-4">
              <p className="font-semibold">Average Score: {calculateAverageScore()}</p>
              <p className="font-semibold">Best Score: {getBestScore()}</p>
            </div>
            <ul className="space-y-2">
              {filteredHistory.map((quiz, index) => (
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
      {!quizStarted ? (
        <QuizStart startQuiz={startQuiz} />
      ) : (
        loading ? (
          <div>Loading...</div>
        ) : (
          <div className="w-full max-w-3xl">
            {errorMessage ? (
              <div className="text-red-500">{errorMessage}</div>
            ) : (
              questions.length > 0 && (
                <QuestionCard 
                  questions={questions} 
                  recordQuizResult={recordQuizResult} 
                  category={questions[0].category}  // Pass the category for history
                />
              )
            )}
          </div>
        )
      )}
      
    </div>
  );
}

export default App;
