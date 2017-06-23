"use strict"
export function cartReducers (state={cart:[]},action){
  switch(action.type){
    case "ADD_TO_CART" :
  return {cart:[...state,...action.payload],
          totalAmount : totals(action.payload).amount,
          totalQty : totals(action.payload).qty
  }
    break;

    case "DELETE_FROM_CART" :
    return {cart:[...state,...action.payload],
    totalAmount : totals(action.payload).amount,
    totalQty : totals(action.payload).qty
    }
break;

  case "UPDATE_CART" :
  const currentCartToUpdate = [...state.cart];
  const indexToUpdate = currentCartToUpdate.findIndex((cartItem)=>{
    return cartItem._id === action._id;
  })
  const  newCartToUpdate = {...currentCartToUpdate[indexToUpdate],qty :currentCartToUpdate[indexToUpdate].qty +action.unit};
   let cartUpdate =  [...currentCartToUpdate.slice(0,indexToUpdate),newCartToUpdate,...currentCartToUpdate.slice(indexToUpdate+1)];
   return {...state,cart:cartUpdate,
     totalAmount : totals(cartUpdate).amount,
     totalQty : totals(cartUpdate).qty
   }
  break;
  }
  return state;
}

export function totals(payloadArr){
 const totalAmount = payloadArr.map(function(cartArr){
 return cartArr.price * cartArr.qty;
 }).reduce(function(a, b) {return a + b;}, 0);

const totalQty =payloadArr.map(function(quantity){
 return quantity.qty;
 }).reduce(function(a, b) {return a + b;}, 0);
 return {
   amount:totalAmount.toFixed(2),
   qty:totalQty}
}
