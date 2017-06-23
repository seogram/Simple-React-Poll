"use strict"

export function booksReducers(state={books:
  [{
    _id: 1,
    title:'Learn Javascript in 24 hour',
    description: 'an aesy way to learn JS ',
    price: 20
  },
  {
     _id: 2,
   title:'Comprehensive guide to Node.js',
   description: 'in this book all sections are covered',
   price: 500
  }]
},action){
   switch(action.type){
    case "GET_BOOKS" :
     return {...state,books:[...state.books]}
     break;

     case "POST_BOOK":
     return {books:[...state.books,...action.payload]}
 break;
 case "DELETE_BOOK" :
 const currentBookToDelete = [...state.books];
 const indexToDelete =currentBookToDelete.findIndex(function(book){
    return book._id.toString() === action.payload;
    })
    return {books:[...currentBookToDelete.slice(0,indexToDelete),
...currentBookToDelete.slice(indexToDelete +1)]}
break;

case  "UPDATE_BOOK" :
const currentBookToUpdate = [...state.books];
const indexToUpdate = currentBookToUpdate.findIndex((book)=>{
  return book._id === action.payload._id;
})
const  newBookToUpdate = {...currentBookToUpdate[indexToUpdate],title : action.payload.title,description : action.payload.description,price : action.payload.price};
console.log("This is how new book looks : ",newBookToUpdate);
return {books:[...currentBookToUpdate.slice(0,indexToUpdate),newBookToUpdate,...currentBookToUpdate.slice(indexToUpdate+1)]};
break;
 }
 return state
}
