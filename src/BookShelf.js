import React, { Component } from "react"
import ProtoTypes from "prop-types"
import Book from "./Book"

export default class BookShelf extends Component {
    /**
     * Method: getShelfTitle
     * Params: key => A keyword of shelf title name
     * Description: This method returns the shelf title from a shelf keyword
     */
    getShelfTitle = (key) => {
        let title = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => { return str.toUpperCase(); });
        return title;
    };

    /**
     * Method: getBookAuthors
     * Params: arrAuthors => The array of authors names
     * Description: This method returns a string of concatenated author names
     */
    getBookAuthors = (arrAuthors) => {
        let authors = "";
        arrAuthors.map((author) => {
            if(authors.length == 0)
                authors += author;
            else
                authors += (", " + author);
        });

        return authors;
    }

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.getShelfTitle(this.props.bookShelfs.key)}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.bookShelfs.values.map((book) => (
                            <li key={book.id}>
                                <Book title={book.title} author={this.getBookAuthors(book.authors)} style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

BookShelf.protoTypes = {
    key: ProtoTypes.string.isRequired,
    title: ProtoTypes.string.isRequired,
    author: ProtoTypes.string.isRequired,
    style: ProtoTypes.object
}