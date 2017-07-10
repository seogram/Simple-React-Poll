"use strict"
export function cartReducers (state={cart:[]},action){
  switch(action.type){
    case "GET_CART" :
    return {...state,cart : action.payload,
      totalAmount : totals(action.payload).amount,
      totalQty : totals(action.payload).qty  
    }

    break;
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

   return {...state,cart:action.payload,
     totalAmount : totals(action.payload).amount,
     totalQty : totals(action.payload).qty
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
