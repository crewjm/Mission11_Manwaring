using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;

namespace Mission11.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;

        public BookController(BookDbContext temp) 
        { 
            _bookContext = temp;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1,[FromQuery] List<string> bookTypes = null) 
        {
            var query = _bookContext.Books.AsQueryable();

            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }

            var totalNumBooks = query.Count();

            var list = query
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

        [HttpGet("BooksAsc")]
        public IActionResult GetSortedBooksAsc(int pageSize = 5, int pageNum = 1, [FromQuery] List<string> bookTypes = null)
        {
            var query = _bookContext.Books.AsQueryable();

            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }

            var totalNumBooks = query.Count();

            var list = query.OrderBy(x => x.Title)
                .Skip((pageNum-1)*pageSize)
                .Take(pageSize)
                .ToList();

            var totalList = new
            {
                Books = list,
                TotalNumBooks = totalNumBooks
            };

            return Ok(totalList);
        }

        [HttpGet("BooksDesc")]
        public IActionResult GetSortedBooksDesc(int pageSize = 5, int pageNum = 1, [FromQuery] List<string> bookTypes = null)
        {
            var query = _bookContext.Books.AsQueryable();

            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }

            var totalNumBooks = query.Count();

            var list = query.OrderByDescending(x => x.Title)
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

        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes () 
        {
            var bookTypes = _bookContext.Books
                .Select(p => p.Category)
                .Distinct()
                .ToList();
            return Ok(bookTypes);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook ([FromBody] Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook (int bookID, [FromBody] Book updatedBook)
        {
            var book = _bookContext.Books.Find(bookID);
            if (book == null)
            {
                return NotFound(new { message = "Book not found" });
            }
            book.Title = updatedBook.Title;
            book.Author = updatedBook.Author;
            book.Publisher = updatedBook.Publisher;
            book.ISBN = updatedBook.ISBN;
            book.Category = updatedBook.Category;
            book.Classification = updatedBook.Classification;
            book.PageCount = updatedBook.PageCount;
            book.Price = updatedBook.Price;
            _bookContext.Books.Update(book);
            _bookContext.SaveChanges();
            return Ok(book);
        }

        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook(int bookID)
        {
            var book = _bookContext.Books.Find(bookID);
            if (book == null)
            {
                return NotFound(new { message = "Book not found" });
            }
            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();
            return Ok();
        }
    }
}
