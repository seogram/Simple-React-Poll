"use strict"

export function loadMoreReducer(state ={moreTests : []},action){
   switch(action.type){
    case "LOAD_MORE_TESTS" :
     return {...state,moreTests:[...action.payload],moreTestIsFetching : false}
     break;

 case "LOAD_MORE_TESTS_REJECTED":
 return {...state}
break;

 }

 return state
}
