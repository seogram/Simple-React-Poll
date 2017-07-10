import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getBooks} from '../../actions/booksActions';
import {bindActionCreators} from 'redux';
import {Grid,Col,Row,Button,Carousel} from 'react-bootstrap';
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
     price={books.price}
     image = {books.images}
     />
     </Col>
      );
    });
    return(
      <Grid>
        <Row>
          <Carousel style={{marginTop:'60px'}} >
             <Carousel.Item>
               <img width={900} height={300} alt="900x300" src="images/cover-2.jpg"/>
               <Carousel.Caption>
                 <h3>First slide label</h3>
                 <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
               </Carousel.Caption>
             </Carousel.Item>
             <Carousel.Item>
               <img width={900} height={300} alt="900x300" src="images/cover-1.jpg"/>
               <Carousel.Caption>
                 <h3>Second slide label</h3>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
               </Carousel.Caption>
             </Carousel.Item>

           </Carousel>
        </Row>
        <Row style={{marginTop :'15px'}}>
          <Cart />
        </Row>
      <Row style={{marginTop : '25px'}}>
         <Col xs={12}>
        {booksList}
         </Col>
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
