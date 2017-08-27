export function reportReducer(state = {
  test : {
    page_Score :'' ,
    page_Size :'',
    page_Speed : '',
    city :'',
    server_IP : '',
    total_Issues : '' ,
    report_Date : '',
    critical_Number : '',
    error_Number : '',
    notice_Number : '',
    warnings_Number : '',
    url : '',
    filmstrip : [],
    mobile_screenShot : '',
    desktop_screenShot : '',
    requests_Number : '',
    issues : {},
    stats_By_Category : {}
  }
}
,action){
   switch(action.type){
    case "GET_TEST" :
     return {...state,test:{...action.payload},isLoading : true}
     break;

     case "PASSMARKED" :
      return {...state,test:{...action.payload},isLoading : true}
      break;


 case "GET_TEST_REJECTED":
 return {...state,isLoading : false}
break;

 }

 return state
}

export function oldReportReducer(state ={
  oldReport : {
    report_id : '',
    date : '',
    user : '',
    page_Score :'' ,
    page_Size :'',
    page_Speed : '',
    city :'',
    server_IP : '',
    total_Issues : '' ,
    report_Date : '',
    critical_Number : '',
    error_Number : '',
    notice_Number : '',
    warnings_Number : '',
    url : '',
    filmstrip : [],
    mobile_screenShot : '',
    desktop_screenShot : '',
    requests_Number : '',
    issues : {},
    stats_By_Category : {}
  }
},action){
   switch(action.type){
    case "GET_OLD_TESTS" :
     return {...state,oldReport:{...action.payload},oldReportFetching : false}
     break;

 case "GET_OLD_TESTS_REJECTED":
 return {...state}
break;

 }

 return state
}

export function allTestsReducer(state ={allTests : []},action){
   switch(action.type){
    case "GET_ALL_TESTS" :
     return {...state,allTests:[...action.payload],allTestIsFetching : false}
     break;

 case "GET_ALL_TESTS_REJECTED":
 return {...state,allTests:[...action.payload],errMsg:'There is an error fetching old reports data . Try again !'}
break;

 }

 return state
}
