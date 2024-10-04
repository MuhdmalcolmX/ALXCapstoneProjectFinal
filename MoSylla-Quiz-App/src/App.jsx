import { useState } from 'react';
import axios from 'axios';
import QuizStart from './components/QuizStart';
import QuestionCard from './components/QuestionCard';

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = async (category, difficulty) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
      );
      setQuestions(response.data.results);
      setQuizStarted(true);  // Move to quiz mode
    } catch (error) {
      console.error('Error fetching questions:', error);
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
            {questions.length > 0 && (
              <QuestionCard questions={questions} />
            )}
          </div>
        )
      )}
    </div>
  );
}

export default App;
