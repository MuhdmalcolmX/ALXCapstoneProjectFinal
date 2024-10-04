import QuizStart from './components/QuizStart';

function App() {
  const startQuiz = (category, difficulty) => {
    console.log(`Quiz started with category: ${category} and difficulty: ${difficulty}`);
    // You can now fetch questions based on this category and difficulty in the next step
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <QuizStart startQuiz={startQuiz} />
    </div>
  );
}

export default App;
