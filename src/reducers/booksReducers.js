"use strict"

export function booksReducers(state={books:[]},action){
   switch(action.type){
    case "GET_BOOKS" :
     return {...state,books:[...action.payload]}
     break;

     case "POST_BOOK":
     return {...state,books:[...state.books,...action.payload],msg : 'Saved ! Click to Continue',style:'success',validation:'success'}
 break;

 case "POST_BOOK_REJECTED":
 return {...state,msg:'Please try again',style:'danger',validation : 'error'}
break;

 case "DELETE_BOOK" :
 const currentBookToDelete = [...state.books];
 const indexToDelete =currentBookToDelete.findIndex(function(book){
    return book._id.toString() === action.payload;
    })
    return {books:[...currentBookToDelete.slice(0,indexToDelete),
...currentBookToDelete.slice(indexToDelete +1)],delStyle : 'success' , delMsg : 'The book has been deleted'}
break;

case "DELETE_BOOK_REJECTED":
return {...state,delMsg:'Please Select a book',delValidation : 'error'}
break;

case  "UPDATE_BOOK" :
const currentBookToUpdate = [...state.books];
const indexToUpdate = currentBookToUpdate.findIndex((book)=>{
return book._id.toString()=== action.payload._id;
})
const  newBookToUpdate = {...currentBookToUpdate[indexToUpdate],title : action.payload.title,description : action.payload.description,price : action.payload.price};
console.log("This is how new book looks : ",newBookToUpdate);
return {books:[...currentBookToUpdate.slice(0,indexToUpdate),newBookToUpdate,...currentBookToUpdate.slice(indexToUpdate+1)]};
break;

case "RESET_FORM":
return {...state,msg :null,style:'primary',validation:null}
break;

case "RESET_DEL_FORM":
return {...state,delMsg :null,style:'danger',delValidation:null}
break;
 }
 return state
}
