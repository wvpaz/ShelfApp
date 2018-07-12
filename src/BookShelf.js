import React, { Component } from "react"
import Book from "./Book"

export default class BookShelf extends Component {
    getShelfTitle = (key) => {
        let title = key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); });
        return title;
    };
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.getShelfTitle(this.props.key)}}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.values.map((book) => (
                            <li>
                                <Book title={book.title} author={book.authors[0]} style={{ width: 128, height: 193, backgroundImage: book.imageLinks[0] }} />
                            </li>
                        ))}
                        {/* <li>
                            <Book title="To Kill a Mockingbird" author="Harper Lee" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }} />
                        </li>
                        <li>
                            <Book title="Ender's Game" author="Orson Scott Card" style={{ width: 128, height: 188, backgroundImage: 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")' }} />
                        </li> */}
                    </ol>
                </div>
            </div>
        );
    }
}