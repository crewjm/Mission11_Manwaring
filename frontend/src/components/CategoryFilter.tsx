import { useEffect, useState } from "react";
import './CategoryFilter.css';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [allCategories, setAllCategories] = useState<string[]>([]);

  // Fetch all available book categories on component mount
  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch('https://localhost:3400/Book/GetBookTypes');
        const data = await response.json();
        setAllCategories(data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    }

    loadCategories();
  }, []);

  // Handles changes to each category checkbox
  const handleToggleCategory = ({ target }: { target: HTMLInputElement }) => {
    const isSelected = selectedCategories.includes(target.value);
    const updatedSelection = isSelected
      ? selectedCategories.filter((cat) => cat !== target.value)
      : [...selectedCategories, target.value];

    setSelectedCategories(updatedSelection);
  };

  return (
    <div className="filter-wrapper">
      <h5>Select Category</h5>
      <div className="filter-options">
        {allCategories.map((cat) => (
          <div className="filter-option" key={cat}>
            <input
              type="checkbox"
              id={`filter-${cat}`}
              value={cat}
              checked={selectedCategories.includes(cat)}
              onChange={handleToggleCategory}
              className="filter-checkbox"
            />
            <label htmlFor={`filter-${cat}`} className="filter-label">
              {cat}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
