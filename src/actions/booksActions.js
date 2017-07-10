"use strict"
import axios from 'axios';

export function getBooks(){
  return function(dispatch){
    axios.get('/api/books')
    .then(function(response){
      dispatch({type:"GET_BOOKS" , payload : response.data})
    })
    .catch(function(err){
      dispatch({type : "GET_BOOK_REJECTED",payload : "There was an error with showing book"})
    })
  }
}

export function postBook(book){
return function(dispatch){
  axios.post('/api/books',book)
  .then(function(response){
    dispatch({type : "POST_BOOK",payload : response.data })
  })
  .catch(function(err){
    dispatch({type : "POST_BOOK_REJECTED",payload : "There was an error with posting book"})
    })
}
}

export function deleteBook(id){
  return function(dispatch){
    axios.delete('/api/books/'+id)
    .then(function(response){
      dispatch({type : "DELETE_BOOK",payload : id })
    })
    .catch(function(err){
      dispatch({type : "DELETE_BOOK_REJECTED",payload : "Please select a book to delete"})
      })
  }
}

export function updateBook(book){
  return {
     type: "UPDATE_BOOK",
    payload : book
  }
}

export function resetForm(){
  return {
     type: "RESET_FORM",
  }
}

export function resetDelForm(){
  return {
     type: "RESET_DEL_FORM",
  }
}
