import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from "./BookShelf"
import BooksList from './BooksList';
import { Link, Route } from 'react-router-dom'
import PropTypes from "prop-types"
import './App.css'

export default class BooksApp extends Component {
  state = {
    shelfs: [],
    query: ''
  };


  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ shelfs: this.createBookShelfs(books) })
    })
  }

  createBookShelfs = (books) => {
    let shelfs = [];

    books.map((book) => {
      let index = shelfs.map((obj) => { return obj.key }).indexOf(book.shelf);

      if (index >= 0) {
        shelfs[index].values.push(book);
      }
      else {
        shelfs.push({ key: book.shelf, values: [book] });
      }
    });

    return shelfs;
  }

  /**
     * Method: getBookAuthors
     * Params: arrAuthors => The array of authors names
     * Description: This method returns a string of concatenated author names
     */
  getBookAuthors = (arrAuthors) => {
    let authors = "";

    if (arrAuthors !== undefined && arrAuthors !== null && arrAuthors.length > 0) {
      arrAuthors.map((author) => {
        if (authors.length === 0)
          authors += author;
        else
          authors += (", " + author);
      });
    }

    return authors;
  }

  /**
     * Method: getShelfTitle
     * Params: key => A keyword of shelf title name
     * Description: This method returns the shelf title from a shelf keyword
     */
    getShelfTitle = (key) => {
      let title = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => { return str.toUpperCase(); });
      return title;
  };

  searchBooks = (query) => {
    return BooksAPI.search(query);
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf);
  }

  render() {
    let shelfs = this.state.shelfs;

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelfs.map((shelf, index) => (
                  <BookShelf 
                    key={'bs_' + index} 
                    bookShelfs={shelf} 
                    getBookAuthors={this.getBookAuthors} 
                    getShelfTitle={this.getShelfTitle}
                    updateBook={this.updateBook} />))}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path="/search" render={() => (
          <BooksList 
            onSearchBooks={this.searchBooks} 
            getBookAuthors={this.getBookAuthors} 
            getShelfTitle={this.getShelfTitle}
            updateBook={this.updateBook} />
        )} />
      </div>
    )
  }
}

BooksApp.propTypes = {
  key: PropTypes.string,
  bookShelfs: PropTypes.array,
  onSearchBooks: PropTypes.func
}