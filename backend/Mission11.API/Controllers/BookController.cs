using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;
using System.Linq;

namespace Mission11.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        // Dependency-injected database context
        private readonly BookDbContext _context;

        public BookController(BookDbContext dbContext)
        {
            _context = dbContext;
        }

        // Returns all books (optionally filtered by category)
        [HttpGet("AllBooks")]
        public IActionResult GetAllBooks(
            int pageSize = 5, 
            int pageNum = 1, 
            [FromQuery] List<string>? bookTypes = null)
        {
            IQueryable<Book> query = _context.Books;

            // Filter by category if categories are passed
            if (bookTypes?.Any() == true)
            {
                query = query.Where(book => bookTypes.Contains(book.Category));
            }

            int totalBooks = query.Count();
            var pagedBooks = query
                                .Skip((pageNum - 1) * pageSize)
                                .Take(pageSize)
                                .ToList();

            var result = new
            {
                Books = pagedBooks,
                TotalNumBooks = totalBooks
            };

            return Ok(result);
        }

        // Returns books sorted alphabetically by title (A-Z)
        [HttpGet("BooksAsc")]
        public IActionResult GetBooksAscending(
            int pageSize = 5, 
            int pageNum = 1, 
            [FromQuery] List<string>? bookTypes = null)
        {
            var query = _context.Books.AsQueryable();

            if (bookTypes?.Any() == true)
            {
                query = query.Where(book => bookTypes.Contains(book.Category));
            }

            int totalBooks = query.Count();
            var pagedSorted = query
                                .OrderBy(book => book.Title)
                                .Skip((pageNum - 1) * pageSize)
                                .Take(pageSize)
                                .ToList();

            return Ok(new { Books = pagedSorted, TotalNumBooks = totalBooks });
        }

        // Returns books sorted in reverse alphabetical order (Z-A)
        [HttpGet("BooksDesc")]
        public IActionResult GetBooksDescending(
            int pageSize = 5, 
            int pageNum = 1, 
            [FromQuery] List<string>? bookTypes = null)
        {
            var query = _context.Books.AsQueryable();

            if (bookTypes?.Any() == true)
            {
                query = query.Where(book => bookTypes.Contains(book.Category));
            }

            int totalBooks = query.Count();
            var pagedSorted = query
                                .OrderByDescending(book => book.Title)
                                .Skip((pageNum - 1) * pageSize)
                                .Take(pageSize)
                                .ToList();

            return Ok(new { Books = pagedSorted, TotalNumBooks = totalBooks });
        }

        // Returns a distinct list of book categories
        [HttpGet("GetBookTypes")]
        public IActionResult GetUniqueBookCategories()
        {
            var distinctCategories = _context.Books
                                        .Select(book => book.Category)
                                        .Distinct()
                                        .ToList();

            return Ok(distinctCategories);
        }
    }
}

