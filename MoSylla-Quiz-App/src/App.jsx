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
  const [searchQuery, setSearchQuery] = useState(''); // Search input
  const [hasSearched, setHasSearched] = useState(false); // To check if search was performed
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

      // Extract category name
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
      category: categoryName, // Store category name
    };
  
    console.log('New quiz recorded:', newQuiz); // Check the categoryName here
  
    setQuizHistory((prevHistory) => {
      console.log('Updated quiz history:', [...prevHistory, newQuiz]); // Check the whole quiz history
      return [...prevHistory, newQuiz];
    });
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
  const filteredHistory = quizHistory.filter((quiz) => {
    return quiz.category && quiz.category.toLowerCase().trim().includes(searchQuery.toLowerCase().trim());
  });
  

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setHasSearched(true); // Set to true when user starts searching
    console.log('Search Query:', query); // Debug: check the input query
    console.log('Filtered History:', filteredHistory); // Debug: check the filtered results
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {!quizStarted ? (
      <QuizStart categories={categories} startQuiz={startQuiz} />
    ) : (
      <QuestionCard
        questions={questions}
        recordQuizResult={recordQuizResult}
        categoryName={currentCategoryName} // Make sure this is correct
      />
    )}

      <div className="p-4 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search quizzes by category..."
          value={searchQuery}
          onChange={handleSearchChange}
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
