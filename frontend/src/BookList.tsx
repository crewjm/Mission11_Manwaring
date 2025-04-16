import { useEffect, useState, useCallback } from 'react';
import { Book } from './types/Book';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState(5);
  const [pageNum, setPageNum] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortOrder, setSortOrder] = useState('AllBooks');

  // Fetch books from the backend
  const fetchBooks = useCallback(async () => {
    const res = await fetch(
      `https://localhost:3400/Book/${sortOrder}?pageSize=${pageSize}&pageNum=${pageNum}`
    );
    const data = await res.json();

    setBooks(data.books);
    setTotalItems(data.totalNumBooks);
    setTotalPages(Math.ceil(data.totalNumBooks / pageSize)); // use fetched count
  }, [sortOrder, pageSize, pageNum]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Handlers for UI interaction
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
    setPageNum(1);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setPageNum(1);
  };

  const handlePageChange = (newPage: number) => {
    setPageNum(newPage);
  };

  return (
    <div>
      <h1>Find Your Book!</h1>
      <hr />

      {/* Book Cards */}
      {books.map((book) => (
        <div className="card" key={book.bookID} id="bookCard">
          <h3 className="card-title">{book.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li><strong>Author:</strong> {book.author}</li>
              <li><strong>Publisher:</strong> {book.publisher}</li>
              <li><strong>ISBN:</strong> {book.isbn}</li>
              <li><strong>Category:</strong> {book.category}</li>
              <li><strong>Pages:</strong> {book.pageCount}</li>
              <li><strong>Price:</strong> ${book.price}</li>
            </ul>
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="mt-3">
        <button
          disabled={pageNum === 1}
          onClick={() => handlePageChange(pageNum - 1)}
        >
          ◀ Previous
        </button>

        {[...Array(totalPages)].map((_, idx) => (
          <span key={`page-${idx + 1}`}>
            <button
              onClick={() => handlePageChange(idx + 1)}
              disabled={pageNum === idx + 1}
            >
              {idx + 1}
            </button>
          </span>
        ))}

        <button
          disabled={pageNum === totalPages}
          onClick={() => handlePageChange(pageNum + 1)}
        >
          Next ▶
        </button>
      </div>

      {/* Sort Dropdown */}
      <div className="mt-3">
        <label>
          Sort by:&nbsp;
          <select
            className="form-select w-auto d-inline-block"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="AllBooks">Not Sorted</option>
            <option value="BooksAsc">A-Z</option>
            <option value="BooksDesc">Z-A</option>
          </select>
        </label>
      </div>

      {/* Page Size Dropdown */}
      <div className="mt-2">
        <label>
          Total Results:&nbsp;
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default BookList;
