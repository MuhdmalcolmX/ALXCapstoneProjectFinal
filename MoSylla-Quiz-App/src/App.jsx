import { useState } from 'react';
import axios from 'axios';
import QuizStart from './components/QuizStart';
import QuestionCard from './components/QuestionCard';

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  return (
    <div className="flex justify-center items-center h-screen">
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
                <QuestionCard questions={questions} />
              )
            )}
          </div>
        )
      )}
    </div>
  );
}

export default App;
