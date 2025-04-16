using System.ComponentModel.DataAnnotations;

namespace Mission11.API.Data
{
    // Represents a book record in the database
    public class Book
    {
        [Key]
        public int BookID { get; set; }

        // --- Core Details ---
        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Author { get; set; } = string.Empty;

        [Required]
        public string Publisher { get; set; } = string.Empty;

        // --- Classification ---
        [Required]
        public string Category { get; set; } = string.Empty;

        [Required]
        public string ISBN { get; set; } = string.Empty;

        // --- Physical & Financial Info ---
        [Required]
        public int PageCount { get; set; } = 0;

        [Required]
        public decimal Price { get; set; } = 0;
    }
}