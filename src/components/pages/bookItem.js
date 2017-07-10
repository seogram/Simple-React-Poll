import React from 'react';
import {Well , Row , Col , Button,Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart,updateCart} from '../../actions/cartActions';
import {deleteBook} from '../../actions/booksActions';

 class BookItem extends React.Component {
   constructor() {
     super();
     this.state = {
       isClicked : false
     }
   }
   onReadMore() {
     this.setState({isClicked:true})
   }
   handleCart(){
     const Newcart = [...this.props.cart,{
       _id:this.props._id,
       title : this.props.title,
       description : this.props.description,
       price : this.props.price,
       images : this.props.image,
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
          this.props.updateCart(_id,1,this.props.cart);
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
<Col xs={8} >
<strong>{this.props.title}</strong>
<p>{(this.state.isClicked===false && this.props.description.length >20)?(this.props.description.substring(0,20)):(this.props.description)}</p>
<button className='link' onClick={this.onReadMore.bind(this)}>
{(this.state.isClicked===false && this.props.description !=null && this.props.description.length >20 )?('read more..'):('')}
</button>
<h6>usd. {this.props.price}</h6>
<Button onClick={this.handleCart.bind(this)} bsStyle='primary'>Buy Now</Button><span>      </span>

</Col>
<Col xs={4} >
  <Image src={this.props.image} responsive />
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
