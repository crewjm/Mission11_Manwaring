using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;

namespace Mission11.API.Controllers
{
    // The BookController class manages requests related to book data
    [ApiController]
    [Route("[controller]")]
    public class BookController : ControllerBase
    {
        private readonly BookDbContext _bookContext;

        // Constructor to initialize the BookDbContext
        public BookController(BookDbContext temp) 
        {
            _bookContext = temp;
        }

        // Endpoint to get a list of all books with optional filtering and pagination
        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, [FromQuery] List<string> bookTypes = null) 
        {
            var query = _bookContext.Books.AsQueryable();

            // If specific book types are provided, filter the books
            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }

            // Get the total number of books in the filtered list
            var totalNumBooks = query.Count();

            // Apply pagination and return the paged list of books
            var list = query
                        .Skip((pageNum - 1) * pageSize)
                        .Take(pageSize)
                        .ToList();

            // Return both the paged books and the total number of books
            var totalList = new 
            {
                Books = list,
                TotalNumBooks = totalNumBooks
            };

            return Ok(totalList);
        }

        // Endpoint to get books sorted in ascending order by title
        [HttpGet("BooksAsc")]
        public IActionResult GetSortedBooksAsc(
            int pageSize = 5, 
            int pageNum = 1, 
            [FromQuery] List<string> bookTypes = null)
        {
            var query = _bookContext.Books.AsQueryable();

            // Filter by book types if provided
            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }

            // Get the total number of books
            var totalNumBooks = query.Count();

            // Apply sorting by title and pagination, then return the paged books
            var list = query
                        .OrderBy(x => x.Title)
                        .Skip((pageNum - 1) * pageSize)
                        .Take(pageSize)
                        .ToList();

            var totalList = new
            {
                Books = list,
                TotalNumBooks = totalNumBooks
            };

            return Ok(totalList);
        }

        // Endpoint to get books sorted in descending order by title
        [HttpGet("BooksDesc")]
        public IActionResult GetSortedBooksDesc(
            int pageSize = 5, 
            int pageNum = 1, 
            [FromQuery] List<string> bookTypes = null)
        {
            var query = _bookContext.Books.AsQueryable();

            // Filter by book types if provided
            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }

            // Get the total number of books
            var totalNumBooks = query.Count();

            // Apply descending sorting by title and pagination
            var list = query
                        .OrderByDescending(x => x.Title)
                        .Skip((pageNum - 1) * pageSize)
                        .Take(pageSize)
                        .ToList();

            var totalList = new
            {
                Books = list,
                TotalNumBooks = totalNumBooks
            };

            return Ok(totalList);
        }

        // Endpoint to get a list of distinct book categories
        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes() 
        {
            // Get distinct book categories from the database
            var bookTypes = _bookContext.Books
                .Select(p => p.Category)
                .Distinct()
                .ToList();

            return Ok(bookTypes);
        }

        // Endpoint to add a new book to the database
        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            // Add the new book and save the changes to the database
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();

            return Ok(newBook);
        }

        // Endpoint to update an existing book's details
        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(
            int bookID, 
            [FromBody] Book updatedBook)
        {
            // Find the book to be updated
            var book = _bookContext.Books.Find(bookID);
            if (book == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            // Update the book's details
            book.Title = updatedBook.Title;
            book.Author = updatedBook.Author;
            book.Publisher = updatedBook.Publisher;
            book.ISBN = updatedBook.ISBN;
            book.Category = updatedBook.Category;
            book.Classification = updatedBook.Classification;
            book.PageCount = updatedBook.PageCount;
            book.Price = updatedBook.Price;

            // Save the changes
            _bookContext.Books.Update(book);
            _bookContext.SaveChanges();

            return Ok(book);
        }

        // Endpoint to delete a book by its ID
        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook(int bookID)
        {
            // Find the book to be deleted
            var book = _bookContext.Books.Find(bookID);
            if (book == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            // Remove the book from the database
            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();

            return Ok();
        }
    }
}

