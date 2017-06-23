import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getBooks} from '../../actions/booksActions';
import {bindActionCreators} from 'redux';
import {Grid,Col,Row,Button} from 'react-bootstrap';
import BookItem from './bookItem';
import BooksForm from './booksForm';
import Cart from './cart';


 class BooksList extends Component{
   componentDidMount(){
    this.props.getBooks();
   }
  render(){
    const booksList = this.props.books.map((books)=>{
      return (
        <Col xs={12} sm={6} md={6} key={books._id}>
     <BookItem
     _id= {books._id}
     title={books.title}
     description={books.description}
     price={books.price}/>
     </Col>
      );
    });
    return(
      <Grid>
        <Row style={{marginTop :'50px'}}>
          <Cart />
        </Row>
      <Row style={{marginTop : '25px'}}>
        <Col xs={12} md={6}>
          <BooksForm />
        </Col>
        {booksList}
      </Row>
      </Grid>
    );
  }
}
function mapStateToProps(state){
  return{
    books : state.books.books
  }
}

function mapDispatchToProps (dispatch){
  return bindActionCreators({getBooks:getBooks},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(BooksList);
