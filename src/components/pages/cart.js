"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {Well , Col , Row ,Image, Button , Panel,Label,ButtonGroup ,Modal} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteFromCart,updateCart,getCart} from '../../actions/cartActions';

 class Cart extends React.Component {
   componentDidMount(){
this.props.getCart();
}
 constructor() {
   super();
   this.state ={
     showModal : false
   }
 }
 open() {
   this.setState({
     showModal : true
   });
 }
 close () {
   this.setState({
     showModal : false
   });
 }
   handleDelete(_id){
     const currentCart = this.props.cart;
     const indexToDelete = currentCart.findIndex(function(item){
       return item._id ==_id;
     })
     let cartAfterDelete= [...currentCart.slice(0,indexToDelete),
 ...currentCart.slice(indexToDelete +1)];
      this.props.deleteFromCart(cartAfterDelete);
   }

onIncrement(_id){
  this.props.updateCart(_id,1,this.props.cart)
}

onDecrement(_id,qty){
  if(qty >1){
  this.props.updateCart(_id,-1,this.props.cart)
}
}

  renderCart() {

    const cartItemsList = this.props.cart.map((item)=>{
     return (
       <Panel key={item._id}>
         <Row>
           <Col xs={12} md={2}>
             <Image src={item.images} />
           </Col>
          <Col xs={12} md={3} >
          <h6>{item.title} </h6>
          </Col>
          <Col xs={12}  md={2}>
          <h6>usd.{item.price}</h6>
          </Col>
          <Col xs={12}  md={2}>
          <h6>qty <Label bsStyle='success'>{item.qty}</Label></h6>
          </Col>
          <Col xs={12}  md={3}>
          <ButtonGroup style={{minWidth:'300px'}}>
          <Button onClick={this.onIncrement.bind(this,item._id)} bsStyle='default' bsSize='small'> + </Button>
          <Button onClick={this.onDecrement.bind(this,item._id,item.qty)} bsStyle='default' bsSize='small'> - </Button>
          <Button onClick={this.handleDelete.bind(this,item._id)} bsStyle='danger' bsSize='small'>Delete</Button>
          </ButtonGroup>
          </Col>
         </Row>
       </Panel>
     );
   },this);

    return (
      <Panel header="Cart" bsStyle='primary'>
        {cartItemsList}
        <Row>
        <Col xs={12}>
          <h6>total amount : {this.props.totalAmount} </h6>
          <Button onClick={()=>this.open()} bsStyle='success' bsSize='small'>Proceed to Checkout</Button>
        </Col>
        </Row>
        <Modal show={this.state.showModal} onHide={()=>this.close()}>
      <Modal.Header closeButton>
        <Modal.Title>Thank you</Modal.Title>
      </Modal.Header>
      <Modal.Body>
    <h6>Your order has been saved.</h6>
      </Modal.Body>
      <Modal.Footer>
        <Col xs={6}>
          <p>Total $ {this.props.totalAmount}</p>
          <p>Total $ {this.props.totalQty}</p>
        </Col>
        <Button onClick={()=>this.close()}>Close</Button>
      </Modal.Footer>
    </Modal>
      </Panel>
    );
  }

  renderEmpty() {
    return (<div></div>);
  }
  render () {
    if (this.props.cart[0]){
      return this.renderCart();
    }else {
      return this.renderEmpty();
    }
  }

}
function mapStateToProps(state) {
  return {
    cart : state.cart.cart,
    totalAmount : state.cart.totalAmount ,
    totalQty : state.cart.totalQty
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    deleteFromCart : deleteFromCart,
    updateCart : updateCart,
    getCart :  getCart
  },dispatch)

}
export default connect(mapStateToProps,mapDispatchToProps)(Cart) ;
