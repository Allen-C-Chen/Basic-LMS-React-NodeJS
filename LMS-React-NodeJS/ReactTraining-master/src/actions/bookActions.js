
import Dispatcher from '../dispatcher/appDispatcher.js';
import axios from 'axios'
//Here add all crud actions for Books


const BooksActions = {
    readBooks: function(){
        axios.get('http://localhost:3000/book')
        .then(res => {
            Dispatcher.dispatch({
            actionType: 'READ_BOOK_SUCCESS',
            data: res.data
            });
        })
        .catch( (err ) => {
            Dispatcher.dispatch({
                actionType: 'READ_BOOK_FAILURE',
                data: err
                // data: res.data
            });
        });
    },
    getOneBook(book_id){
        axios.get('http://localhost:3000/book/' + book_id)
        .then(res => {
            Dispatcher.dispatch({
                actionType: 'GET_BOOK_SUCCESS',
                data: res.data
            })
        })
    },
    deleteBook: function(newBook){
        axios.delete('http://localhost:3000/book/' + newBook.book_id)
        .then(res => {
            console.log(res);
            Dispatcher.dispatch({
                actionType: 'DELETE_BOOK_SUCCESS',
                data: newBook
            });
        })
        .catch( (err ) => {
            Dispatcher.dispatch({
                actionType: 'DELETE_BOOK_FAILURE',
                data: err
            });
        });
    },
    load_update_book(book){
        Dispatcher.dispatch({
            actionType: 'LOAD_UPDATE_PAGE',
            data: book
        });
    },
    updateBook: function(book){
        // const name = prompt("What is the new title of the book", book.title);
        // const author = prompt("What is the new author name", book.author);
        console.log(name);
        if(book.title === "" || book.author == ""){
            Dispatcher.dispatch({
                actionType: "BOOK_PROMPT_INVALID_FAILURE",
                data: "No null fields when updating, pelase try again"
            });
        }
        else{
            const newBook = {
                book_id: book.book_id,
                title: book.title,
                author: book.author
            }
            axios.put("http://localhost:3000/book", newBook)
                .then(res => {
                    console.log(res);
                    Dispatcher.dispatch({
                        actionType: "UPDATE_BOOK_SUCCESS",
                        data: newBook
                    });
                })
                .catch( (err ) => {
                    Dispatcher.dispatch({
                        actionType: 'UPDATE_BOOK_FAILURE',
                        data: err
                    });
                });
        }

    },
    addBook: function (book) {
        // let name = prompt("What is the title of the new book?");
        // let author = prompt("What is the author of this book?");
        // const book = {
        //     title: name,
        //     author: author
        // }
        if(book.title === "" || book.author === ""){
            Dispatcher.dispatch({
                actionType: "BOOK_PROMPT_INVALID_FAILURE",
                data: "No null fields when adding, pelase try again"
            });
        }
        else{
            axios.post("http://localhost:3000/book", book)
            .then(res => {
                var resBook = res.data;
                Dispatcher.dispatch({
                    actionType: "ADD_BOOK_SUCCESS",
                    data: resBook
                })
            })
            .catch((err) => {
                Dispatcher.dispatch({
                    actionType: "ADD_BOOK_FAILURE",
                    data: err
                });
            });                
    }
        }

}
module.exports = BooksActions;