import { useState } from 'react';
import './Book.css';
import { BookInterface } from '../utils/BookInterface';
import Button from './Button';

interface BookProps {
    book: BookInterface;
    updateBook: (updatedBook: BookInterface) => void;
    deleteBook: (deletedBook: BookInterface) => void;
}

// Book component, destructures props to extract book and updateBook function and sets their type
function Book({ book, updateBook, deleteBook }: BookProps) {

    // Declare states for book properties
    const [edit, setEdit] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(book.title);
    const [author, setAuthor] = useState<string>(book.author);
    const [isbn] = useState<number>(book.isbn);
    const [rating, setRating] = useState<number>(book.rating);

    // Create a list of stars for the books rating
    const stars = [];
    for (let i = 0; i < book.rating; i++) {
        stars.push(<span key={i}>⭐</span>)
    }

    // Function to update book with new edits
    const handleEdit = () => {

        // Set updatedBook object to hold new state
        const updatedBook: BookInterface = {
            title: title,
            author: author,
            isbn: isbn,
            genres: book.genres,
            rating: rating,
            cover: book.cover
        }

        // Use the updateBook function provided from props to update the book
        updateBook(updatedBook);
        // Disable the edit-mode
        setEdit(false);
    };

    // Function to delete book
    const handleDelete = () => {
        const deletedBook: BookInterface = {
            title: title,
            author: author,
            isbn: isbn,
            genres: book.genres,
            rating: rating,
            cover: book.cover
        }
        deleteBook(deletedBook);
    }

    return (
        // If edit mode is enabled, show edit fields, else show normal book html
        <article className="book-container">{edit ?
            <>
                <section className='book-info'>
                    <figure style={{ backgroundImage: `url(${book.cover})` }}></figure>
                    {/* Update fields for title and author */}
                    <input defaultValue={title} onChange={(e) => setTitle(e.target.value)} id='newTitle' />
                    <input defaultValue={author} onChange={(e) => setAuthor(e.target.value)} id='newAuthor' />
                    <p>{book.isbn}</p>
                    <p>Genres: {book.genres ? book.genres.join(", ") : "Not defined"}</p>
                    {/* Update field for rating */}
                    <input max="5" min="1" type='number' defaultValue={rating} onChange={(e) => setRating(parseInt(e.target.value))} id='newRating' />
                </section>
                <Button handler={handleDelete} name="Delete" />
                <Button handler={handleEdit} name="Confirm" />
            </>
            :
            /* Show default book html, not edit mode */
            <>
                <section className='book-info'>
                    <figure style={{ backgroundImage: `url(${book.cover})` }}></figure>
                    <h2>{book.title}</h2>
                    <p>{book.author}</p>
                    <p>{book.isbn}</p>
                    <p>Genres: {book.genres ? book.genres.join(", ") : "Not defined"}</p>
                    <p>{stars}</p>
                </section>
                <Button handler={() => { setEdit(true) }} name="Edit" />
            </>
        }
        </article>

    )
};
export default Book;