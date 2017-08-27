"use strict"

export function userProfileReducers(state ={
  profile : {
    userName : '',
    firstName : '',
    lastName : '',
    email : ''
  }},action){
   switch(action.type){
    case "GET_USER_PROFILE" :

     return {...state,profile:{...action.payload},profileFetching : false}
     break;

    case "GET_USER_PROFILE_REJECTED":
    return {...state,profile:{...action.payload},errMsg:'There is an error fetching your profile data . Try again!'}
    break;

    case "UPDATE_USER_PROFILE" :

    return {...state,profile:{...action.payload}, successMsg : "Your Profile Updated Successfully " }
     break;

    case "UPDATE_USER_PROFILE_REJECTED":
    return {...state,profile:{...action.payload} ,errMsg:'There is an error updtaing  your profile data . Try again!'}
    break;

    case "UPDATE_PASSWORD":
    return {...state ,profile:{...action.payload}, successMsg : "Your Password Updated Successfully"}
    break;

    case "UPDATE_PASSWORD_REJECTED" :
    return {...state,profile:{...action.payload},errMsg:'There is an error updating your password'}
    break;
 }

 return state
}
