
import React from 'react';
import BookActions from '../actions/bookActions';
import PropTypes from 'prop-types';


export class UpdateBookForm extends React.Component{
   constructor(props) {

      super(props);
      this.state = {
        title: "TEMP"
        // author: this.props.book.author
      }
      console.log("What is in prompt");
      console.log(this.props);
      console.log("TEST");
      console.log(this.props.books); 

      // console.log(this.props.location.state.str);       

    }
    componentDidMount(){
      // const{handle} = this.props.match.params
      // const{book} =   this.props.location.state
      // console.log(handle);
      // console.log(book);
    }
   render(){
    //const { title, author } = this.props;

      return (
         <div>
            <h1> Test</h1>
         <h1> Testdone </h1>

           <input type="text" value = {this.state.title} />
         </div>
       );
   }
}
UpdateBookForm.propTypes = {
  books: PropTypes.string.isRequired
};
export class AddBookForm extends React.Component{
      add_Book(book){
      //window.open("http://localhost:3000/book");
      //throw "Something went wrong";
        console.log("SHOULD BE HERE 1");
        BookActions.addBook(book);
  }
   constructor(props) {
      super(props);
      this.state = {title: '',
                  author: '',
                  error: null, errorInfo: null };

      // this.handleChange = this.handleChange.bind(this);
      // this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
      this.handleChange = this.handleChange.bind(this);

      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange (evt) {
      this.setState({ [evt.target.name]: evt.target.value });
    }

    
   //  handleChange(event) {
   //    this.setState({value: event.target.value});
   //  }
   //  handleChangeAuthor(event) {
   //    this.setState({value: event.target.author});
   //  }  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.title + "  " + this.state.author);
      event.preventDefault();
      const book = {
         title: this.state.title,
         author: this.state.author
      }
      this.add_Book(book);
      // try{
      //   this.add_Book(book);      
      // }
      // catch(e){
      //   this.setState.errorInfo = true;
      //   console.log("there is an error");
      // }
    }
  
    render() {
      if(this.state.errorInfo){
        return <h2>Something went wrong.</h2>
      }
      else{
        return (
        
          <form onSubmit={this.handleSubmit}>
            <label>
              What is the Title:
              <input type="text" name = "title" onChange={this.handleChange} />
            </label>
            <label>
              What is the Author:
              <input type="text" name = "author" onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
      }

      
}

