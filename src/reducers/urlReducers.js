"use strict"

export function urlReducers(state = {
test : {results :{
  pagespeed_score : "",
  yslow_score : "",
  page_load_time : "",
  page_elements : "",
  page_bytes : "",
  fully_loaded_time : ""
},
resources : {screenshot :""}}}
,action){
   switch(action.type){
    case "GET_TEST" :
     return {...state,test:{...action.payload},isLoading : false}
     break;

 case "GET_TEST_REJECTED":
 return {...state}
break;

 }

 return state
}
