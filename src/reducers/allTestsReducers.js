"use strict"

export function allTestsReducers(state ={allTests : []},action){
   switch(action.type){
    case "GET_ALL_TESTS" :
     return {...state,allTests:[...action.payload],allTestIsFetching : false}
     break;

 case "GET_ALL_TESTS_REJECTED":
 return {...state}
break;

 }

 return state
}
