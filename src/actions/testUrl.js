"use strict"
import axios from 'axios';

export function testUrl(url){
  return function(dispatch){
    axios.get('/api/testUrl/'+url)
    .then(function(response){
      dispatch({type:"GET_TEST" , payload : response.data})
    })
    .catch(function(err){
      dispatch({type : "GET_TEST_REJECTED",payload : "There was an error with showing test result"})
    })
  }
}
