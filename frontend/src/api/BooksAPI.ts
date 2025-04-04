import { Book } from '../types/Book';

interface FetchBooksResponse {
  books: Book[];
  totalNumBooks: number;
}

const API_URL =
  'https://mission13manwaringbackend-f2fwf4ejaxcsceak.eastus-01.azurewebsites.net/Book';

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[],
  sortOrder: string
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
      .join('&');
    const response = await fetch(
      `${API_URL}/${sortOrder}?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch books: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/AddBook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });
    if (!response.ok) {
      throw new Error(`Failed to add book: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

export const updateBook = async (
  bookID: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/UpdateBook/${bookID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });
    if (!response.ok) {
      throw new Error(`Failed to update book: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

export const deleteBook = async (bookID: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteBook/${bookID}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete book: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};
