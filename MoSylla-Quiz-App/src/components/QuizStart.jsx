import { useState } from 'react';

function QuizStart({ categories, startQuiz }) {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('easy');

  const handleStartQuiz = () => {
    if (!category) {
      alert('Please select a category before starting the quiz.');
      return;
    }
    startQuiz(category, difficulty);
  };

  return (
    <div>
      <h2>Select a Quiz</h2>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  );
}

export default QuizStart;
