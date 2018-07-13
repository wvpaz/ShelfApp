import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from "./BookShelf"
import PropTypes from "prop-types"
import './App.css'

export default class BooksApp extends Component {
  state = {
    shelfs: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    query: ''
  };


  componentWillMount() {
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

  handleChange = (event) => {
    this.setState({ query: event.target.value });
  }

  render() {
    const shelfs = this.state.shelfs;

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.handleChange} />
                
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {shelfs.map((shelf, index) => (<BookShelf key={'bs_' + index} bookShelfs={shelf} />))}
                </div>
              </div>
              <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              </div>
            </div>
          )}
      </div>
    )
  }
}

BooksApp.propTypes = {
  key: PropTypes.string.isRequired,
  bookShelfs: PropTypes.array
}