import React from 'react';
import {Well , Row , Col , Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart,updateCart} from '../../actions/cartActions';
import {deleteBook} from '../../actions/booksActions';

 class BookItem extends React.Component {
   handleCart(){
     const Newcart = [...this.props.cart,{
       _id:this.props._id,
       title : this.props.title,
       description : this.props.description,
       price : this.props.price,
       qty : 1
     }]
     if(this.props.cart.length){
        let _id = this.props._id;
        let cartIndex = this.props.cart.findIndex((item)=>{
          return _id===item._id;
        });
        if (cartIndex===-1){
          this.props.addToCart(Newcart);
        }else {
          this.props.updateCart(_id,1)
        }
     }else {
       this.props.addToCart(Newcart);
     }
   }

   onDeleteBook(_id){
     this.props.deleteBook(_id);
   }
  render() {
    return (
      <Well>
<Row>
<Col xs={12} >
<strong>{this.props.title}</strong>
<p>{this.props.description}</p>
<h6>usd. {this.props.price}</h6>
<Button onClick={this.handleCart.bind(this)} bsStyle='primary'>Buy Now</Button><span>      </span>
<Button onClick={this.onDeleteBook.bind(this,this.props._id)} bsStyle='danger' >Delete</Button>
</Col>
</Row>
      </Well>
    );
  }
}

function mapStateToProps(state){
  return {
    cart : state.cart.cart
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    addToCart : addToCart,
    updateCart : updateCart,
    deleteBook : deleteBook
  },dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(BookItem) ;
