
import Dispatcher from '../dispatcher/appDispatcher.js';
import axios from 'axios'
//Here add all crud actions for Authors


const AuthorsActions = {
    readAuthors: function(){
        axios.get('http://localhost:3000/author')
        .then(res => {
            Dispatcher.dispatch({
            actionType: 'READ_AUTHOR_SUCCESS',
            data: res.data
            });
        })
        .catch( (err ) => {
            Dispatcher.dispatch({
                actionType: 'READ_AUTHOR_FAILURE',
                data: err
                // data: res.data
            });
        });
    },
    deleteAuthor: function(newAuthor){
        axios.delete('http://localhost:3000/author/' + newAuthor.author_id)
        .then(res => {
            console.log(res);
            Dispatcher.dispatch({
                actionType: 'DELETE_AUTHOR_SUCCESS',
                data: newAuthor
            });
        })
        .catch( (err ) => {
            Dispatcher.dispatch({
                actionType: 'DELETE_AUTHOR_FAILURE',
                data: err
            });
        });
    },
    updateAuthor: function(author){
        const first_name = prompt("What is the new first name of the author", author.first_name);
        const last_name = prompt("What is the new last name of the author", author.last_name);
        if(first_name == "" || last_name == ""){
            Dispatcher.dispatch({
                actionType: "AUTHOR_PROMPT_INVALID_FAILURE",
                data: "No null fields when updating, pelase try again"
            });
        }
        else{
            const newAuthor = {
                author_id: author.author_id,
                first_name: first_name,
                last_name: last_name
            }
            axios.put("http://localhost:3000/author", newAuthor)
                .then(res => {
                    console.log(res);
                    Dispatcher.dispatch({
                        actionType: "UPDATE_AUTHOR_SUCCESS",
                        data: newAuthor
                    });
                })
                .catch( (err ) => {
                    Dispatcher.dispatch({
                        actionType: 'UPDATE_AUTHOR_FAILURE',
                        data: err
                    });
                });
        }

    },
    addAuthor: function () {
      const firstName = prompt("What is the first name of the author");
      const lastName = prompt("What is the last name of the author ");
      const author = {
            first_name: firstName,
            last_name: lastName
        }
        if(firstName == "" || lastName == ""){
            Dispatcher.dispatch({
                actionType: "AUTHOR_PROMPT_INVALID_FAILURE",
                data: "No null fields when adding, pelase try again"
            });
        }
        else{
            axios.post("http://localhost:3000/author", author)
            .then(res => {
                var resAuthor = res.data;
                Dispatcher.dispatch({
                    actionType: "ADD_AUTHOR_SUCCESS",
                    data: resAuthor
                })
            })
            .catch((err) => {
                Dispatcher.dispatch({
                    actionType: "ADD_AUTHOR_FAILURE",
                    data: err
                });
            });                
    }
        }

}
module.exports = AuthorsActions;