import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { CartItem } from '../types/CartItem';
import { UseCart } from '../context/CartContext';
import { Tooltip } from 'bootstrap';

type BookListProps = {
  selectedCategories: string[];
};

function BookList({ selectedCategories }: BookListProps) {
  const [bookList, setBookList] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState(5);
  const [pageNum, setPageNum] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [sortMode, setSortMode] = useState('AllBooks');

  const { addToCart } = UseCart();

  // Convert a Book object to a CartItem and add it to the cart
  const handleAddToCart = (book: Book) => {
    const item: CartItem = {
      bookID: Number(book.bookID),
      title: book.title ?? 'No Title',
      price: Number(book.price),
      quantity: 1,
    };
    addToCart(item);
  };

  // Fetch books every time relevant parameters change
  useEffect(() => {
    const fetchBooks = async () => {
      const categoryQuery = selectedCategories
        .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
        .join('&');

      const endpoint = `https://localhost:3400/Book/${sortMode}?pageSize=${pageSize}&pageNum=${pageNum}${
        selectedCategories.length ? `&${categoryQuery}` : ''
      }`;

      const res = await fetch(endpoint);
      const data = await res.json();

      setBookList(data.books);
      setTotalBooks(data.totalNumBooks);
      setPageCount(Math.ceil(data.totalNumBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, sortMode, selectedCategories]);

  // Initialize Bootstrap tooltips
  useEffect(() => {
    const elements = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    elements.forEach((el) => new Tooltip(el));
  }, []);

  return (
    <>
      {/* Render book cards */}
      {bookList.map((book) => (
        <div className="card" id="bookCard" key={book.bookID}>
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

            <button
              className="btn btn-success"
              onClick={() => handleAddToCart(book)}
              data-bs-toggle="tooltip"
              title="Click to add this book to your cart"
            >
              Add to Cart!
            </button>
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="mt-3">
        <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
          Previous
        </button>

        {[...Array(pageCount)].map((_, index) => (
          <button
            key={index}
            onClick={() => setPageNum(index + 1)}
            disabled={pageNum === index + 1}
          >
            {index + 1}
          </button>
        ))}

        <button disabled={pageNum === pageCount} onClick={() => setPageNum(pageNum + 1)}>
          Next
        </button>
      </div>

      {/* Sort Selector */}
      <div className="mt-4">
        <label>
          Sort by:{' '}
          <select
            className="form-select w-auto d-inline-block"
            value={sortMode}
            onChange={(e) => {
              setSortMode(e.target.value);
              setPageNum(1); // reset page when sort changes
            }}
          >
            <option value="AllBooks">Not Sorted</option>
            <option value="BooksAsc">A-Z</option>
            <option value="BooksDesc">Z-A</option>
          </select>
        </label>
      </div>

      {/* Page Size Selector */}
      <div className="mt-3">
        <label>
          Total Results:{' '}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageNum(1); // reset page when size changes
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </label>
      </div>
    </>
  );
}

export default BookList;

