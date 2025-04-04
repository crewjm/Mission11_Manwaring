import { useState } from 'react';
import { Book } from '../types/Book';
import { deleteBook, fetchBooks } from '../api/BooksAPI';
import Pagination from '../components/Pagination';
import { useEffect } from 'react';
import NewBookForm from '../components/NewBookForm';
import EditBookForm from '../components/EditBookForm';

const AdminBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('AllBooks');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editBook, setEditBook] = useState<Book | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, [], sortOrder);
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, sortOrder]);

  const handleDelete = async (bookID: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this book?'
    );
    if (confirmDelete) {
      try {
        deleteBook(bookID);
        setBooks(books.filter((b) => b.bookID !== bookID));
      } catch (error) {
        alert('Error deleting book:');
      }
    }
  };

  if (loading) return <div>Loading books...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <h1>Administrator - Books</h1>

      {!showForm && (
        <button
          className="btn btn-success mb-3"
          onClick={() => setShowForm(true)}
        >
          Add A New Book!
        </button>
      )}

      {showForm && (
        <NewBookForm
          onSuccess={() => {
            setShowForm(false);
            fetchBooks(pageSize, pageNum, [], sortOrder).then((data) => {
              setBooks(data.books);
            });
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editBook && (
        <EditBookForm
          book={editBook}
          onSuccess={() => {
            setEditBook(null);
            fetchBooks(pageSize, pageNum, [], sortOrder).then((data) => {
              setBooks(data.books);
            });
          }}
          onCancel={() => setEditBook(null)}
        />
      )}

      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Book ID</th>
            <th>Book Title</th>
            <th>Book Author</th>
            <th>Book Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.bookID}>
              <td>{b.bookID}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.price}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm w-100 mb-1"
                  onClick={() => setEditBook(b)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm w-100 mb-1"
                  onClick={() => handleDelete(b.bookID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </div>
  );
};

export default AdminBooksPage;
