"use strict"
import axios from 'axios'
export function userProfile (){
  return function(dispatch){
    axios.get('/api/getProfile',{headers:{authorization : localStorage.getItem('token')}})
    .then(function(response){
      dispatch({type:'GET_USER_PROFILE', payload : response.data})
    })
    .catch(function(err){
      dispatch({type:'GET_USER_PROFILE_REJECTED', payload : 'There is an error fetching profile'})
    })
  }
}

export function profileUpdate (profile){
  return function(dispatch){
    axios.put('/api/updateProfile',profile,{headers:{authorization : localStorage.getItem('token')}})
    .then(function(response){
      dispatch({type:'UPDATE_USER_PROFILE', payload : response.data})
    })
    .catch(function(err){
      dispatch({type:'UPDATE_USER_PROFILE_REJECTED', payload : 'There is an error updating profile'})
    })
  }
}

export function passwordUpdate (password){
  return function(dispatch){
    axios.put('/api/updatePassword',password,{headers:{authorization : localStorage.getItem('token')}})
    .then(function(response){
      dispatch({type:'UPDATE_PASSWORD',payload : response.data})
    })
    .catch(function(err){
      dispatch({type : 'UPDATE_PASSWORD_REJECTED',payload : 'There is an error updating password'})
    })
  }
}
