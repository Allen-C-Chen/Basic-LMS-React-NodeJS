"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';
import {Link} from 'react-router-dom';

//import {Authors} from "./addBook.js";

export class BookList extends React.Component{

    createBookRow(book){
        return (
            <tr key={book.book_id}>
                <td> {book.book_id} </td>
                <td> {book.title} </td>
                <td> {book.author} </td>
                <td> 
                    <button className = "BookList" onClick = {
                        () => {
                            this.delete_book(book)
                        }}>Remove item
                    </button>
                </td>
                <td> 
                {/* <Link to = {{
                    pathname: "/updateBook",
                    title: "ALLEN IS HERE",
                    state: {
                        firstName: "HI TEHREREWREREWREW",
                        //title: "Allen"
                    } 
                }
                }>
                    Update
                </Link> */}

                {/* <Link to="/updateBook" replace>Update</Link> */}
                {/* <Link to="/updateBook/3"  params={{ testvalue: "helloTHEREREHRE" }}>Update</Link> */}
                    {/* <button className = "BookList" onClick = {
                        () => {
                            this.update_book(book)
                        }}>Update item
                    </button> */}
                
                    <button className = "BookList" onClick = {
                        () => {
                            this.load_update_book(book)
                        }}>Update item
                    </button>
                </td>

            </tr>
        );
    }
    delete_book(book){
        BookActions.deleteBook(book);
    }
    load_update_book(book){
        console.log("Loading...1")
        BookActions.load_update_book(book)
    }
    update_book(book){
        BookActions.updateBook(book);
    }
    add_Book(){
        //window.open("http://localhost:3000/book");
        BookActions.addBook();
    }
    UNSAFE_componentWillMount(){
        BookActions.readBooks();
    }
    render() {
        return(
            <div>
                <h1>Books</h1>
                <button type="button" onClick={ this.add_Book }>Add Book</button>
                <Link to="/addBook" replace>Add Book</Link>

                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.bookList.map(this.createBookRow, this)}
                    </tbody>    
                </table>
            </div>
        );
    }
}

BookList.propTypes = {
    bookList: PropTypes.array.isRequired,
    title: PropTypes.string
};



