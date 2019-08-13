import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';


const CHANGE_EVENT = 'change';
let _bookStore = {
  books: [],
  book: {
      title: "",
      author: ""
  }
};

class BookStoreClass extends EventEmitter{

    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    getAllBooks(){
        return _bookStore.books;
    }
    deleteBook(book){
        const newBooks = _bookStore.books.filter(elem => {return elem.book_id != book.book_id});
        _bookStore.books = newBooks;
    }
    loadUpdateBook(book){
        _bookStore.book = book;
        //<Link to="/updateBook" replace>Update</Link>
        window.open("http://localhost:9090/#/updateBook")
        //win.focus();
        return book;
    }
    updateBook(book){
        const index = _bookStore.books.findIndex((elem) => { return elem.book_id == book.book_id});
        _bookStore.books[index] = book;        
    }

}

const BookStore = new BookStoreClass();

Dispatcher.register( (action) => {

    switch (action.actionType){
        //Read all books
        case 'READ_BOOK_FAILURE':
            //alert("There is no data to access");
            alert(action.data);
            break;
        case 'READ_BOOK_SUCCESS':
            _bookStore.books = action.data;
            BookStore.emitChange();
            break;
        //Delete Book
        case 'DELETE_BOOK_SUCCESS':
            BookStore.deleteBook(action.data);
            BookStore.emitChange();
            break;
        case 'DELETE_BOOK_FAILURE':
            alert(action.data); //never put view logic in switch
            break;
        case 'BOOK_PROMPT_INVALID_FAILURE':
            alert(action.data);
            break;
        //Update Book
        case 'LOAD_UPDATE_PAGE':
            //BookStore.updateBook(action.data);
            BookStore.loadUpdateBook(action.data);
            //BookStore.emitChange(); 
            break;
        case 'UPDATE_BOOK_SUCCESS':
            BookStore.updateBook(action.data);
            BookStore.emitChange(); 
            break;
        case 'UPDATE_BOOK_FAILURE':
            alert(action.data);
            break;          
        case 'ADD_BOOK_SUCCESS':
            _bookStore.books.push(action.data);
            BookStore.emitChange(); 
            break;
        case 'ADD_BOOK_FAILURE':
            alert(action.data);
            //console.log("THERE IS AN ERROR");
            //throw "(action.data)";
            //return "error";
            break;         
        default:
            return;
    }
} );

export default BookStore;