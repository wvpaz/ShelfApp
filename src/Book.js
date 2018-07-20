import React from "react"

function Book(props) {
    const shelfOptions = ["currentlyReading", "wantToRead", "read", "none"];
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={props.style}></div>
                <div className="book-shelf-changer">
                    <select defaultValue="none" value={props.shelf} onChange={props.updateBook()}>
                        <option value="move" disabled>Move to...</option>
                        {shelfOptions.map((title, index) => (
                            <option key={"b_"+index} value={title}>{props.getShelfTitle(title)}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="book-title">{props.title}</div>
            <div className="book-authors">{props.author}</div>
        </div>
    );
}

export default Book;