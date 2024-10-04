import React, { useState, useEffect } from 'react';
import axios from 'axios';

function QuizStart({ startQuiz }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [difficulty, setDifficulty] = useState('easy');

  // Fetch categories from the Open Trivia Database API
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

  const handleStartQuiz = () => {
    startQuiz(selectedCategory, difficulty);
  };

  return (
    <div className="text-center p-4">
      <h2 className="text-2xl font-bold mb-4">Start Quiz</h2>

      <div className="mb-4">
        <label className="block mb-2">Select Topic:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">-- Select Category --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Select Difficulty:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button onClick={handleStartQuiz} className="p-2 bg-blue-500 text-white rounded">
        Start Quiz
      </button>
    </div>
  );
}

export default QuizStart;
