import { Book } from '../types/Book';

// Define the structure of the response from the fetchBooks function
interface FetchBooksResponse {
  books: Book[];        // List of books
  totalNumBooks: number; // Total number of books available
}

// Base API URL for book-related operations
const API_URL = 
  'https://mission13crewbackend-d4gjdrdfa6c0c2hm.eastus-01.azurewebsites.net/Book';

/**
 * Fetch books from the API, with options for pagination, filtering, and sorting.
 * @param pageSize - The number of books to fetch per page
 * @param pageNum - The page number to fetch
 * @param selectedCategories - The categories of books to filter by
 * @param sortOrder - The sorting order of the books (e.g., 'BooksAsc', 'BooksDesc')
 * @returns A promise that resolves with the list of books and the total number of books
 */
export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[],
  sortOrder: string
): Promise<FetchBooksResponse> => {
  try {
    // Prepare query string for categories (if any are selected)
    const categoryParams = selectedCategories
      .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
      .join('&');
    
    // Construct the full URL for the API request
    const url = `${API_URL}/${sortOrder}?pageSize=${pageSize}&pageNum=${pageNum}` +
      (selectedCategories.length ? `&${categoryParams}` : '');
    
    // Send the request to fetch books
    const response = await fetch(url);
    
    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch books: ${response.statusText}`);
    }
    
    // Parse and return the JSON response
    return await response.json();
  } catch (error) {
    // Log the error if the fetch operation fails
    console.error('Error fetching books:', error);
    throw error;  // Re-throw the error
  }
};

/**
 * Add a new book to the API.
 * @param newBook - The book object to add
 * @returns A promise that resolves with the added book
 */
export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    // Send a POST request to add a new book
    const response = await fetch(`${API_URL}/AddBook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify that the request body is JSON
      },
      body: JSON.stringify(newBook),  // Convert the book object to JSON
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to add book: ${response.statusText}`);
    }

    // Parse and return the newly added book
    return await response.json();
  } catch (error) {
    // Log the error if adding the book fails
    console.error('Error adding book:', error);
    throw error;  // Re-throw the error
  }
};

/**
 * Update an existing book's information.
 * @param bookID - The ID of the book to update
 * @param updatedBook - The updated book object
 * @returns A promise that resolves with the updated book
 */
export const updateBook = async (
  bookID: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    // Send a PUT request to update the book details
    const response = await fetch(`${API_URL}/UpdateBook/${bookID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Specify that the request body is JSON
      },
      body: JSON.stringify(updatedBook), // Convert the updated book object to JSON
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to update book: ${response.statusText}`);
    }

    // Parse and return the updated book
    return await response.json();
  } catch (error) {
    // Log the error if updating the book fails
    console.error('Error updating book:', error);
    throw error;  // Re-throw the error
  }
};

/**
 * Delete a book by its ID.
 * @param bookID - The ID of the book to delete
 * @returns A promise that resolves when the book is successfully deleted
 */
export const deleteBook = async (bookID: number): Promise<void> => {
  try {
    // Send a DELETE request to remove the book from the database
    const response = await fetch(`${API_URL}/DeleteBook/${bookID}`, {
      method: 'DELETE', // Specify the DELETE method
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to delete book: ${response.statusText}`);
    }
  } catch (error) {
    // Log the error if deleting the book fails
    console.error('Error deleting book:', error);
    throw error;  // Re-throw the error
  }
};

