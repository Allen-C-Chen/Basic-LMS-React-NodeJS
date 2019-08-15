"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';
import {Link} from 'react-router-dom';

//import {Authors} from "./addBook.js";
import {ErrorBoundary} from './ErrorBoundary.js';
export class BookList extends React.Component{

    createBookRow(book){
        console.log("BOOK LIST");
        console.log(this.props);

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
                <Link to = {{ 
                    pathname: `/updateBook/${book.book_id}/${book.title}/${book.author}`
                }
                }>
                <button className="BookList">Update</button>
                </Link>
                </td>
            </tr>
        );
    }
    delete_book(book){
        BookActions.deleteBook(book);
    }
    load_update_book(book){

        //this.props.book = book;
        BookActions.load_update_book(book)
    }
    update_book(book){
        <Link to = {{ 
            pathname: `/updateBook/${book.book_id}/${book.title}/${book.author}`
        }
        }>
            Update
        </Link>
        //BookActions.updateBook(book);
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
            <ErrorBoundary>

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
            </ErrorBoundary>    

        );
    }
}

BookList.propTypes = {
    bookList: PropTypes.array.isRequired,
    title: PropTypes.string
};



