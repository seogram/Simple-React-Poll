"use strict"
import React from 'react';
import {MenuItem, InputGroup, DropdownButton,Image, Col, Row, Well, Panel, FormControl,FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postBook, deleteBook, getBooks,resetForm,resetDelForm} from '../../actions/booksActions';
import axios from 'axios';
class BooksForm extends React.Component{
constructor() {
super();
this.state = {
images:[{}],
img:''
}
}
componentDidMount(){
this.props.getBooks();
//GET IMAGES FROM API
axios.get('/api/images')
.then(function(response){
this.setState({images:response.data});
}.bind(this))
.catch(function(err){
  this.setState({images:'error loading image files from the server', img:''})
}.bind(this))
}

handleSubmit(){
const book=[{

title:findDOMNode(this.refs.title).value,
description:findDOMNode(this.refs.description).value,
images:findDOMNode(this.refs.image).value,
price:findDOMNode(this.refs.price).value,
}]
this.props.postBook(book);
}

onDelete(){
let bookId =findDOMNode(this.refs.delete).value;
this.props.deleteBook(bookId);
}

handleSelect(img){
this.setState({
img: '/images/'+ img
})
}

handleReset(){
  this.props.resetForm();
  findDOMNode(this.refs.title).value='';
  findDOMNode(this.refs.description).value ='';
  findDOMNode(this.refs.price).value = '';
}

delHandleReset(){
  this.props.resetDelForm();
  findDOMNode(this.refs.delete).value = '';
}

render(){
  const booksList =this.props.books.map(function(booksArr){
return (
<option key={booksArr._id}>
{booksArr._id}</option>
)
})
const imgList =this.state.images.map(function(imgArr, i){
return(
<MenuItem key={i}
eventKey={imgArr.name}
onClick={this.handleSelect.bind(this,
imgArr.name)}>{imgArr.name}</MenuItem>
)
}, this)

return(
<Well style={{marginTop : '45px'}}>
<Row>
<Col xs={12} sm={6}>
<Panel>
   <FormGroup >
<InputGroup >
<FormControl type="text"
ref="image" value={this.state.img}  />
<FormControl.Feedback />
<DropdownButton
componentClass={InputGroup.Button}
id="input-dropdown-addon"
title="Select an image"
bsStyle="primary">
{imgList}
</DropdownButton>
</InputGroup>
 </FormGroup >
<Image src={this.state.img}
responsive/>
</Panel>
</Col>
<Col xs={12} sm={6}>
<Panel>

<FormGroup controlId="title" validationState = {this.props.validation}>
<ControlLabel>Title</ControlLabel>
<FormControl
type="text"
placeholder="Enter Title"
ref="title" />
<FormControl.Feedback />

</FormGroup>
<FormGroup controlId="description" validationState = {this.props.validation}>
<ControlLabel>Description</ControlLabel>
<FormControl
type="text"
placeholder="Enter
Description"
ref="description" />
<FormControl.Feedback />

</FormGroup>
<FormGroup controlId="price" validationState = {this.props.validation}>
  <ControlLabel>Price</ControlLabel>
<FormControl
type="text"
placeholder="Enter Price"
ref="price" />
<FormControl.Feedback />
</FormGroup>

<Button

onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.handleReset.bind(this))}
bsStyle={(!this.props.style)?('default'):(this.props.style)}>
{(!this.props.msg)?('Save Book'):(this.props.msg)}
</Button>
</Panel>
<Panel>
<FormGroup
controlId="formControlsSelect" validationState = {this.props.delValidation}>
<ControlLabel>Select a book id to delete</ControlLabel>
<FormControl ref="delete"
componentClass="select" placeholder="select">
<option
value="select">select</option>
{booksList}
</FormControl>
<FormControl.Feedback />
</FormGroup>
<Button
  onClick={(!this.props.delMsg)?(this.onDelete.bind(this)):(this.delHandleReset.bind(this))}
  bsStyle={(!this.props.delStyle)?('danger'):(this.props.delStyle)}>
  {(!this.props.delMsg)?('Delete Book'):(this.props.delMsg)}
</Button>
</Panel>
</Col>
</Row>
</Well>
)
}
}
function mapStateToProps(state){
return {
books: state.books.books,
msg : state.books.msg,
style: state.books.style,
validation : state.books.validation,
delMsg : state.books.delMsg,
delValidation : state.books.delValidation
}
}
function mapDispatchToProps(dispatch){
return bindActionCreators({
postBook,
deleteBook,
getBooks,
resetForm,
resetDelForm
}, dispatch)
}
export default connect(mapStateToProps,
mapDispatchToProps)(BooksForm);
//-----------------------------------------------------------------------
