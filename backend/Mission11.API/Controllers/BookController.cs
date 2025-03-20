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
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1) 
        {
            var list = _bookContext.Books
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = _bookContext.Books.Count();

            var totalList = new 
            {
                Books = list, 
                TotalNumBooks = totalNumBooks
            };

            return Ok(totalList);
        }

        [HttpGet("BooksAsc")]
        public IActionResult GetSortedBooksAsc(int pageSize = 5, int pageNum = 1)
        {
            var list = _bookContext.Books.OrderBy(x => x.Title)
                .Skip((pageNum-1)*pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = _bookContext.Books.Count();

            var totalList = new
            {
                Books = list,
                TotalNumBooks = totalNumBooks
            };

            return Ok(totalList);
        }

        [HttpGet("BooksDesc")]
        public IActionResult GetSortedBooksDesc(int pageSize = 5, int pageNum = 1)
        {
            var list = _bookContext.Books.OrderByDescending(x => x.Title)
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            
            var totalNumBooks = _bookContext.Books.Count();

            var totalList = new
            {
                Books = list,
                TotalNumBooks = totalNumBooks
            };

            return Ok(totalList);
        }
    }
}
