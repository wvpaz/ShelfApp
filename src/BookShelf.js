import React, { Component } from "react"
import ProtoTypes from "prop-types"
import Book from "./Book"

function BookShelf(props) {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.getShelfTitle(props.bookShelfs.key)}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.bookShelfs.values.map((book) => (
                        <li key={book.id}>
                            <Book
                                book={book}
                                getBookAuthors={props.getBookAuthors}
                                getShelfTitle={props.getShelfTitle}
                                updateBook={props.updateBook}
                                style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks !== undefined && book.imageLinks.smallThumbnail})` }} />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default BookShelf

BookShelf.protoTypes = {
    key: ProtoTypes.string.isRequired,
    title: ProtoTypes.string.isRequired,
    author: ProtoTypes.string.isRequired,
    style: ProtoTypes.object
}