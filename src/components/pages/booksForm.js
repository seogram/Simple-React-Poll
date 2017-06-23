"use strict"
import React from 'react';
import {Form , FormGroup, ControlLabel, FormControl ,Well , Panel , Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {postBook,deleteBook} from '../../actions/booksActions';
import {findDOMNode} from 'react-dom';
class BooksForm extends React.Component {

onDelete(){
let book_id = findDOMNode(this.refs.delete).value
this.props.deleteBook(book_id);
}

  handleSubmit(){
    const book = [{
    title : findDOMNode(this.refs.title).value,
    description : findDOMNode(this.refs.description).value ,
    price : findDOMNode(this.refs.price).value
    }];
    this.props.postBook(book);
  }
  render() {
    const booksList = this.props.books.map((books)=>{
      return <option key={books._id} value={books._id} >{books._id} -- {books.title}</option>
 });

    return(
      <Well >
        <Panel>
          <FormGroup controlId="title">
            <ControlLabel>Title</ControlLabel>
            <FormControl type="text" placeholder="Enter Title" ref="title">
            </FormControl>
          </FormGroup>
          <FormGroup controlId="description">
            <ControlLabel>Description</ControlLabel>
            <FormControl type="text" placeholder="Enter Description" ref="description">
            </FormControl>
          </FormGroup>
          <FormGroup controlId="price">
            <ControlLabel>Price</ControlLabel>
            <FormControl type="text" placeholder="Enter Price" ref="price">
            </FormControl>
          </FormGroup>
          <Button onClick={this.handleSubmit.bind(this)} bsStyle='primary'>Add</Button>
        </Panel>
        <Panel>
          <FormGroup controlId="delete">
            <ControlLabel>Select Book to delete</ControlLabel>
            <FormControl  componentClass="select"  ref="delete">
              <option value="select">Select</option>
              {booksList}
            </FormControl>
          </FormGroup>
          <Button onClick={this.onDelete.bind(this)} bsStyle='danger'>Delete</Button>

        </Panel>
      </Well>
    );
  }
}

function mapStateToProps(state){
  return{
    books : state.books.books
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({postBook:postBook,deleteBook:deleteBook},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(BooksForm);
