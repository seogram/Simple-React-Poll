"use strict"

export function urlReducers(state = {
test : {desktop :{
  title: '',
  targeturl : '',
  score : '' ,
  htmlResponseBytes : '' ,
  cssResponseBytes : '',
  imageResponseBytes : '',
  javascriptResponseBytes : '',
  LandingPageRedirectsName :'',
  LandingPageRedirectsImpact : '',
  LandingPageRedirectsSummary :'',
  EnableGzipCompressionName : '',
  EnableGzipCompressionImpact : '',
  EnableGzipCompressionSummary : '',
  LeverageBrowserCachingName : '',
  LeverageBrowserCachingImpact : '',
  LeverageBrowserCachingSummary :'',
  ServerResponseTimeName : '',
  ServerResponseTimeImpact : '',
  ServerResponseTimeSummary : '',
  MinifyCssName : '',
  MinifyCssImpact : '',
  MinifyCssSummary : '',
  MinifyHTMLName : '',
  MinifyHTMLImpact : '',
  MinifyHTMLSummary : '',
  MinifyJavaScriptName : '',
  MinifyJavaScriptImpact : '',
  MinifyJavaScriptSummary : '',
  MinimizeRenderBlockingName : '',
  MinimizeRenderBlockingImpact : '',
  MinimizeRenderBlockingSummary : '',
  OptimizeImagesName : '',
  OptimizeImagesImpact : '',
  OptimizeImagesSummary : '',
  PrioritizeVisibleContentName : '',
  PrioritizeVisibleContentImpact : '',
  PrioritizeVisibleContentSummary : '',
  //screenshotData : '',
  screenshotPath : '',
  screenshotwidth : '',
  screenshotHeight : ''
},
mobile : {screenshot :""}}}
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
