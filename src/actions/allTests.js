"use strict"
import axios from 'axios'
export function getAllTests (){
  return function(dispatch){
    axios.get('/api/test')
    .then(function(response){
      dispatch({type:'GET_ALL_TESTS', payload : response.data})
    })
    .catch(function(err){
      dispatch({type:'GET_ALL_TESTS_REJECTED', payload : 'There is an error fetching results'})
    })
  }
}
