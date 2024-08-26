import { FormEventHandler, useState } from "react";
import "./AddBook.css";
import { BookInterface } from "../utils/BookInterface";
import Button from "./Button";

interface AddBookProps {
    addBookFunction: (bookToAdd: BookInterface) => void;
    toggleAddView: () => void;
}

// Declare component AddBook that receives the props addBookFunction and toggleAddView
export default function AddBook({
    addBookFunction,
    toggleAddView,
}: AddBookProps) {
    const [genres, setGenres] = useState<string[]>([]);
    const [genreToAdd, setGenreToAdd] = useState<string>("");

    // Helper function to add a book
    const addBook: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const bookData = new FormData(e.target as HTMLFormElement);
        const newBook = {
            title: bookData.get("title") as string,
            author: bookData.get("author") as string,
            isbn: parseInt(bookData.get("isbn") as string),
            genres: genres,
            rating: parseInt(bookData.get("rating") as string),
            cover: bookData.get("cover") as string,
        };
        addBookFunction(newBook);
    };

    const addGenre = () => {
        if (genreToAdd.trim()) {
            if (genres.includes(genreToAdd.trim())) {
                alert(`The genre "${genreToAdd}" has already been added.`);
            } else {
                setGenres([...genres, genreToAdd.trim()]);
                setGenreToAdd('');  // Clear the input field after adding the genre
            }
        }
    };

    // Returns the AddBook component in TSX syntax
    // Each input has an onChange event handler to update the
    // field's value and keep it in the component state. We add our
    // book by finally clicking the button "Add" which propogates the
    // new book to our parent component via the prop addBookFunction
    // Refactor onChange listeners to simplify
    return (
        <article className='addBook-container'>
            <h3>ADD NEW BOOK</h3>
            {/* Using an onSubmit event instead of onClick on add button */}
            <form
                className='addBook-form'
                onSubmit={addBook}
            >
                <label className='cover-field'>
                    Cover:
                    <input
                        placeholder='Cover'
                        id='cover'
                        name='cover'
                    />
                </label>
                <label className='author-field'>
                    Author:
                    <input
                        required
                        placeholder='Author'
                        id='author'
                        name='author'
                    />
                </label>
                <label className='title-field'>
                    Title:
                    <input
                        required
                        placeholder='Title'
                        id='title'
                        name='title'
                    />
                </label>
                {genres.length > 0 ? (
                    <ul className='genres'>
                        {genres.map((genre, i) => (
                            <li key={i}>{genre}</li>
                        ))}
                    </ul>
                ) : null}
                <section className='genre-field'>
                    <label>
                        Genres:
                        <input
                            placeholder='Genre'
                            value={genreToAdd}
                            onChange={(e) => setGenreToAdd(e.target.value)}
                            id='genre'
                        />
                    </label>
                    <Button
                        className='add'
                        handler={addGenre}
                        name='Add'
                    />
                </section>
                <label className='isbn-field'>
                    ISBN:
                    <input
                        required
                        placeholder='00000000'
                        id='isbn'
                        name='isbn'
                    />
                </label>
                <label className='rating-field'>
                    Rating:
                    <input
                        required
                        max='5'
                        min='1'
                        type='number'
                        defaultValue={3}
                        id='rating'
                        name='rating'
                    />
                </label>
                <section className='buttons-field'>
                    <Button
                        className='cancel'
                        handler={toggleAddView}
                        name='Cancel'
                    />
                    <Button
                        type='submit'
                        className='add'
                        name='Add'
                    />
                </section>
            </form>
        </article>
    );
}
