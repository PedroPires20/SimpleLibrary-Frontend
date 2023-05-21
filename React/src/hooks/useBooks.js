import { useState, useEffect } from "react";
import { removeEmptyFilters } from "../utils/utils";
import NetworkClient from "../utils/network_client";
import Book from "../models/book";


export function useBooks() {
    const [query, setQuery] = useState({});
    const [books, setBooks] = useState([]);
    const api = new NetworkClient(API_BASE_URL);

    function handleQuery(queryText, filters) {
        let newQuery = {};
        if(queryText) {
            newQuery.text = queryText;
        }
        newQuery.filters = removeEmptyFilters(filters);
        setQuery(newQuery);
    }

    async function createBook(formData) {
        let newBook = Book.fromFormData(formData);
        try {
            let { createdId } = await api.createBook(newBook.toRequestBody());
            setBooks([...books, Book.fromFormData(formData, createdId)]);
        }catch(exception) {
            console.log("Error creating book: " + exception.message);
        }
    }

    async function updateBook(index, newData) {
        let updatedBook = Book.fromFormData(newData, books[index].id, index);
        let diff = books[index].getFieldsDiff(updatedBook);
        if(!!diff) {
            try {
                await api.updateBook(books[index].id, diff);
                setBooks([
                    ...books.slice(0, index),
                    updatedBook,
                    ...books.slice(index + 1)
                ]);
            }catch(exception) {
                console.log("Error updating book: " + exception);
            }
        }
    }

    async function deleteBook(index) {
        try {
            await api.deleteBook(books[index].id);
            setBooks([...books.slice(0, index), ...books.slice(index + 1)]);
        }catch(exception) {
            console.log("Error deleting book: " + exception);
        }
    }

    useEffect(() => {
        api.searchBooks(query.text, query.filters, { title: 1 })
        .then((booksData) => setBooks(booksData.map(
            (bookData, index) => new Book(bookData, index)
        )))
        .catch((error) => setBooks(error));
    }, [query]);

    return { books, handleQuery, createBook, updateBook, deleteBook };
}
