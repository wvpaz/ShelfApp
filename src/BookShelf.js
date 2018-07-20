import React, { Component } from "react"
import ProtoTypes from "prop-types"
import Book from "./Book"

export default class BookShelf extends Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.getShelfTitle(this.props.bookShelfs.key)}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.bookShelfs.values.map((book) => (
                            <li key={book.id}>
                                <Book 
                                    title={book.title} 
                                    shelf={book.shelf} 
                                    author={this.props.getBookAuthors(book.authors)} 
                                    getShelfTitle={this.props.getShelfTitle} 
                                    updateBook={this.updateBook} 
                                    style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks !== undefined && book.imageLinks.smallThumbnail})` }} />
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