import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { UseCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { Tooltip } from 'bootstrap'; // Import Tooltip from Bootstrap
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  
  // State hooks
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('AllBooks');
  const { addToCart } = UseCart();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Add book to cart
  const handleAddToCart = (b: Book) => {
    const newItem: CartItem = {
      bookID: Number(b.bookID),
      title: b.title || 'No Book Found',
      price: Number(b.price),
      quantity: 1,
    };
    addToCart(newItem);
  };

  // Fetch books when pageSize, pageNum, sortOrder, or selectedCategories change
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories, sortOrder);
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, sortOrder, selectedCategories]);

  // Show loading or error message
  if (loading) return <p>Loading books now!</p>;
  if (error) return <p className='text-red-500'>Error: {error}</p>;

  // Initialize tooltips
  useEffect(() => {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
      new Tooltip(tooltipTriggerEl);
    });
  }, []);

  return (
    <>
      {/* Render books */}
      {books.map((b) => (
        <div id="bookCard" className="card" key={b.bookID}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li><strong>Author:</strong> {b.author}</li>
              <li><strong>Publisher:</strong> {b.publisher}</li>
              <li><strong>ISBN:</strong> {b.isbn}</li>
              <li><strong>Category:</strong> {b.category}</li>
              <li><strong>Pages:</strong> {b.pageCount}</li>
              <li><strong>Price:</strong> ${b.price}</li>
            </ul>
            <button
              className="btn btn-success"
              onClick={() => handleAddToCart(b)}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Click to add to cart"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}

      {/* Pagination controls */}
      <Pagination 
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        sortOrder={sortOrder}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
        onSortOrderChange={setSortOrder}
      />
    </>
  );
}

export default BookList;

