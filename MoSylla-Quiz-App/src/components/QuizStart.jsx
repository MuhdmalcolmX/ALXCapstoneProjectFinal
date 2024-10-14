import { useState } from 'react';

function QuizStart({ categories, startQuiz }) {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [errorMessage, setErrorMessage] = useState('');

  const handleStartQuiz = () => {
    if (!category) {
      setErrorMessage('Please select a category before starting the quiz.');
      return;
    }
    setErrorMessage(''); // Clear any previous error messages
    startQuiz(category, difficulty);
  };

  return (
    <div className="quiz-start-container p-4">
      <h2 className="text-xl font-bold mb-4">Select a Quiz</h2>
      
      <div className="mb-4">
        <label className="block mb-2">Category:</label>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))
          ) : (
            <option value="">Loading categories...</option>
          )}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Difficulty:</label>
        <select 
          value={difficulty} 
          onChange={(e) => setDifficulty(e.target.value)} 
          className="w-full p-2 border rounded"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <button 
        onClick={handleStartQuiz} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Start Quiz
      </button>
    </div>
  );
}

export default QuizStart;
