import React, { useState } from "react";
import { Book } from "../types/Book";
import { addBook } from "../api/BooksAPI";

interface NewBookFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const NewBookForm = ({onSuccess, onCancel} : NewBookFormProps) => { 
    const [formData, setFormData] = useState<Book>({
        bookID: 0,
        title: "",
        author: "",
        publisher: "",
        isbn: "",
        category: "",
        classification: "",
        pageCount: 0,
        price: 0, 
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        
        const updatedValue = type === "number" ? Number(value) : value;
        
        setFormData({
            ...formData,
            [name]: updatedValue,
        });
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!formData.title || !formData.author || !formData.isbn) {
            alert("Please fill out all required fields");
            return;
        }
        
        try {
            await addBook(formData);
            onSuccess();
        } catch (error) {
            
            console.error("Failed to add book:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a New Book!</h2>
            <label>Title: <input type="text" name="title" value={formData.title} onChange={handleChange}/></label>
            <label>Author: <input type="text" name="author" value={formData.author} onChange={handleChange}/></label>
            <label>Publisher: <input type="text" name="publisher" value={formData.publisher} onChange={handleChange}/></label>
            <label>ISBN: <input type="text" name="isbn" value={formData.isbn} onChange={handleChange}/></label>
            <label>Category: <input type="text" name="category" value={formData.category} onChange={handleChange}/></label>
            <label>Classification: <input type="text" name="classification" value={formData.classification} onChange={handleChange}/></label>
            <label>Pages: <input type="number" name="pageCount" value={formData.pageCount} onChange={handleChange}/></label>
            <label>Price: <input type="number" name="price" value={formData.price} onChange={handleChange}/></label>
            <button type="submit">Add</button>
            <button type="button" onClick={onCancel}>Cancel Changes</button>
        </form>
    );
};

export default NewBookForm;