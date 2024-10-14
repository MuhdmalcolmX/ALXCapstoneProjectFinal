import { useEffect, useState } from 'react';
import axios from 'axios';
import QuizStart from './components/QuizStart';
import QuestionCard from './components/QuestionCard';
import QuizHistory from './components/QuizHistory';

function App() {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [quizHistory, setQuizHistory] = useState([]);
  const [currentCategoryName, setCurrentCategoryName] = useState('');

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
  const startQuiz = async (categoryId, difficulty) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple`
      );
      if (response.data.results.length === 0) {
        throw new Error('No questions found for the selected category and difficulty.');
      }
      const fetchedQuestions = response.data.results;
      setQuestions(fetchedQuestions);
      const categoryName = fetchedQuestions[0].category;
      setCurrentCategoryName(categoryName);
      setQuizStarted(true);
    } catch (error) {
      setErrorMessage(error.message || 'Failed to fetch quiz questions. Please try again later.');
    }
    setLoading(false);
  };

  const recordQuizResult = (score, categoryName) => {
    const newQuiz = {
      date: new Date().toLocaleString(),
      score,
      category: categoryName,
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

  return (
    <div className="flex justify-center items-center h-screen">
      {!quizStarted ? (
        <QuizStart categories={categories} startQuiz={startQuiz} />
      ) : (
        <QuestionCard
          questions={questions}
          recordQuizResult={recordQuizResult}
          categoryName={currentCategoryName}
        />
      )}

      <div className="p-4 max-w-md mx-auto">
        {quizHistory.length > 0 && (
          <QuizHistory history={quizHistory} averageScore={calculateAverageScore()} bestScore={getBestScore()} />
        )}
      </div>
    </div>
  );
}

export default App;
