"use strict"
import axios from 'axios'
export function resultDetails (test_id){
  return function(dispatch){
    axios.get('/api/resultDetailsPage/'+test_id)
    .then(function(response){
      dispatch({type:'GET_TEST_DETAILS', payload : response.data})
    })
    .catch(function(err){
      dispatch({type:'GET_TEST_DETAILS_REJECTED', payload : 'There is an error fetching test details'})
    })
  }
}
