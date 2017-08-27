import axios from 'axios';

export function testUrl(url){

  return function(dispatch){
  //  axios.get('/api/testUrl/'+url)
  //axios.get('/api/passmarked',{


  let auth = null;
if (localStorage.getItem('token') ==null){
  auth = 'noUser';
}else {
  auth = localStorage.getItem('token');
}
  axios.get('/api/testUrl',{params: {url: url},headers:{authorization :auth }})
    .then(function(response){

    dispatch({type:"GET_TEST" , payload : response.data})

    })
    .catch(function(err){
      dispatch({type : "GET_TEST_REJECTED",payload : "There was an error with showing test result"})
    })
  }
}

export function getOldReport (id){
  return function(dispatch){
    axios.get('/api/getOldReport/'+id,{headers:{authorization : localStorage.getItem('token')}})
    .then(function(response){
      dispatch({type:'GET_OLD_TESTS', payload : response.data})
    })
    .catch(function(err){
      dispatch({type:'GET_OLD_TESTS_REJECTED', payload : 'There is an error fetching history result'})
    })
  }
}

export function getAllTests (skip){
  return function(dispatch){
    axios.get('/api/allTest/'+skip,{headers:{authorization : localStorage.getItem('token')}})
    .then(function(response){
      dispatch({type:'GET_ALL_TESTS', payload : response.data})
    })
    .catch(function(err){
      dispatch({type:'GET_ALL_TESTS_REJECTED', payload : 'There is an error fetching results'})
    })
  }
}
