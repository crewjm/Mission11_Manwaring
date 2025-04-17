import React, { useState } from "react";
import { Book } from "../types/Book";
import { updateBook } from "../api/BooksAPI";

interface EditBookFormProps {
  book: Book;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditBookForm = ({ book, onSuccess, onCancel }: EditBookFormProps) => {
  // Initialize form data state with values from the passed book
  const [formData, setFormData] = useState<Book>({ ...book });

  // Handle input changes and update formData state accordingly
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const updatedValue = type === "number" ? Number(value) : value;

    // Update specific field in formData
    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  // Handle form submission, validate data, and send update request
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Ensure all required fields are filled
    if (!formData.title || !formData.author || !formData.isbn) {
      alert("Please fill out all required fields");
      return;
    }

    try {
      // Update the book in the database
      await updateBook(formData.bookID, formData);
      onSuccess(); // Trigger success callback if update is successful
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form heading */}
      <h2>Edit Book</h2>

      {/* Book title input */}
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>

      {/* Author input */}
      <label>
        Author:
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
      </label>

      {/* Publisher input */}
      <label>
        Publisher:
        <input
          type="text"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
        />
      </label>

      {/* ISBN input */}
      <label>
        ISBN:
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
        />
      </label>

      {/* Category input */}
      <label>
        Category:
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </label>

      {/* Classification input */}
      <label>
        Classification:
        <input
          type="text"
          name="classification"
          value={formData.classification}
          onChange={handleChange}
        />
      </label>

      {/* Page count input */}
      <label>
        Pages:
        <input
          type="number"
          name="pageCount"
          value={formData.pageCount}
          onChange={handleChange}
        />
      </label>

      {/* Price input */}
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </label>

      {/* Submit and Cancel buttons */}
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditBookForm;

