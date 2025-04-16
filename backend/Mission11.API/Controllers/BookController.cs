using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;

namespace Mission11.API.Controllers
{
    // Handles all book-related API endpoints
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookDbContext _context;

        // Constructor: inject the BookDbContext
        public BookController(BookDbContext context)
        {
            _context = context;
        }

        // GET: /Book/AllBooks
        [HttpGet("AllBooks")]
        public IActionResult GetAllBooks(int pageSize = 5, int pageNum = 1)
        {
            var pagedBooks = _context.Books
                                     .Skip((pageNum - 1) * pageSize)
                                     .Take(pageSize)
                                     .ToList();

            var totalBooksCount = _context.Books.Count();

            var response = new
            {
                Books = pagedBooks,
                TotalNumBooks = totalBooksCount
            };

            return Ok(response);
        }

        // GET: /Book/BooksAsc
        [HttpGet("BooksAsc")]
        public IActionResult GetBooksAscending(int pageSize = 5, int pageNum = 1)
        {
            // Get books ordered A-Z
            var pagedBooksAsc = _context.Books
                                        .OrderBy(book => book.Title)
                                        .Skip((pageNum - 1) * pageSize)
                                        .Take(pageSize)
                                        .ToList();

            var totalBooksCount = _context.Books.Count();

            var response = new
            {
                Books = pagedBooksAsc,
                TotalNumBooks = totalBooksCount
            };

            return Ok(response);
        }

        // GET: /Book/BooksDesc
        [HttpGet("BooksDesc")]
        public IActionResult GetBooksDescending(int pageSize = 5, int pageNum = 1)
        {
            // Get books ordered Z-A
            var pagedBooksDesc = _context.Books
                                         .OrderByDescending(book => book.Title)
                                         .Skip((pageNum - 1) * pageSize)
                                         .Take(pageSize)
                                         .ToList();

            var totalBooksCount = _context.Books.Count();

            var response = new
            {
                Books = pagedBooksDesc,
                TotalNumBooks = totalBooksCount
            };

            return Ok(response);
        }
    }
}

