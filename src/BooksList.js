import React, { Component } from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'

export default class BooksList extends Component {
    state = {
        query: '',
        books: []
    };

    handleChange = (query) => {
        this.setState({query});
        this.props.onSearchBooks(query).then((books) => {
            this.setState({books})
        })
    }

    render() {
        const {query, books} = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.handleChange(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {(books !== undefined && books.length > 0) && books.map((book) => (
                            <li key={book.id}>
                                <Book 
                                    // title={book.title} 
                                    // shelf={book.shelf} 
                                    // author={this.props.getBookAuthors(book.authors)} 
                                    book={book}
                                    getBookAuthors={this.props.getBookAuthors}
                                    getShelfTitle={this.props.getShelfTitle} 
                                    updateBook={this.props.updateBook} 
                                    style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks !== undefined && book.imageLinks.smallThumbnail})` }} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}