"use strict"
import axios from 'axios'
export function loadMore (skip){
  return function(dispatch){
    axios.get('/api/loadMore/'+skip)
    .then(function(response){
      dispatch({type:'LOAD_MORE_TESTS', payload : response.data})
    })
    .catch(function(err){
      dispatch({type:'LOAD_MORE_TESTS_REJECTED', payload : 'There is an error fetching results'})
    })
  }
}
