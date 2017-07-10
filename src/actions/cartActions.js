"use strict"
import axios from 'axios'
export function getCart(){
  return function(dispatch){
    axios.get('/api/cart')
    .then(function(response){
      dispatch({type:"GET_CART" , payload : response.data})
    })
    .catch(function(err){
      dispatch({type : "GET_CART_REJECTED",payload : "There was an error with adding to cart"})
    })
  }
}
export function addToCart(cart){
  return function(dispatch){
    axios.post('/api/cart',cart)
    .then(function(response){
      dispatch({type:"ADD_TO_CART" , payload : response.data})
    })
    .catch(function(err){
      dispatch({type : "ADD_TO_CART_REJECTED",payload : "There was an error with adding to cart"})
    })
  }
}



export function deleteFromCart(cart){
  return function(dispatch){
    axios.post('/api/cart',cart)
    .then(function(response){
      dispatch({type:"DELETE_FROM_CART" , payload : response.data})
    })
    .catch(function(err){
      dispatch({type : "DELETE_FROM_CART_REJECTED",payload : "There was an error with adding to cart"})
    })
  }
}

export function updateCart(_id,unit,cart){
  const currentCartToUpdate = cart;
  const indexToUpdate = currentCartToUpdate.findIndex((cartItem)=>{
    return cartItem._id === _id;
  })
  const  newCartToUpdate = {...currentCartToUpdate[indexToUpdate],qty :currentCartToUpdate[indexToUpdate].qty +unit};
   let cartUpdate =  [...currentCartToUpdate.slice(0,indexToUpdate),newCartToUpdate,...currentCartToUpdate.slice(indexToUpdate+1)];

   return function(dispatch){
     axios.post('/api/cart',cartUpdate)
     .then(function(response){
       dispatch({type:"UPDATE_CART" , payload : response.data})
     })
     .catch(function(err){
       dispatch({type : "UPDATE_CART_REJECTED",payload : "There was an error with updating cart"})
     })
   }
}
