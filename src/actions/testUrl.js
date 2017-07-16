"use strict"
import axios from 'axios';

export function testUrl(url,strategy){
  return function(dispatch){
  //  axios.get('/api/testUrl/'+url)
  axios.get('/api/testUrl',{
      params: {
        url: url,
        strategy : strategy}
      })
    .then(function(response){
      dispatch({type:"GET_TEST" , payload : response.data})
    })
    .catch(function(err){
      dispatch({type : "GET_TEST_REJECTED",payload : "There was an error with showing test result"})
    })
  }
}
