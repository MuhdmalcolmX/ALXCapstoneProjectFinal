import { useEffect, useState } from 'react';
import axios from 'axios';
import QuizStart from './components/QuizStart';
import QuestionCard from './components/QuestionCard';
import QuizHistory from './components/QuizHistory';

function App() {
  const [categories, setCategories] = useState([]); // Store categories
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [quizHistory, setQuizHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Search input
  const [hasSearched, setHasSearched] = useState(false); // To check if search was performed

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api_category.php');
        setCategories(response.data.trivia_categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch questions by category and difficulty
  const startQuiz = async (category, difficulty) => {
    setLoading(true);
    setErrorMessage('');
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
    return Math.max(...quizHistory.map((quiz) => quiz.score));
  };

  // Filter quiz history based on search query
  const filteredHistory = quizHistory.filter((quiz) =>
    quiz.category && quiz.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setHasSearched(true); // Set to true when user starts searching
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {!quizStarted ? (
        <QuizStart categories={categories} startQuiz={startQuiz} />
      ) : loading ? (
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
                category={questions[0].category} // Pass the category for history
              />
            )
          )}
        </div>
      )}

      <div className="p-4 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search quizzes by category..."
          value={searchQuery}
          onChange={handleSearchChange} // Update search query and set hasSearched to true
          className="w-full p-2 border rounded mb-4"
        />
        {/* Only show the "No quizzes found" message if a search was performed */}
        {hasSearched && filteredHistory.length === 0 && (
          <p>No quizzes found matching your search.</p>
        )}
        {filteredHistory.length > 0 && (
          <QuizHistory history={filteredHistory} averageScore={calculateAverageScore()} bestScore={getBestScore()} />
        )}
      </div>
    </div>
  );
}

export default App;
