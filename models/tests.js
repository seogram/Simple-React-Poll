'use strict'
var mongoose = require('mongoose');
var testSchema = mongoose.Schema({
  // resources : {
  //   report_pdf: String,
  //    pagespeed: String,
  //    har: String,
  //    pagespeed_files: String,
  //    report_pdf_full: String,
  //    yslow: String,
  //    screenshot: String
  // },
  desktop : {
    title: String,
    targeturl : String,
    score : Number ,
    htmlResponseBytes : Number ,
    cssResponseBytes : Number,
    imageResponseBytes : Number,
    javascriptResponseBytes : Number,
    LandingPageRedirectsName :String,
    LandingPageRedirectsImpact : Number,
    LandingPageRedirectsSummary :String,
    EnableGzipCompressionName : String,
    EnableGzipCompressionImpact : Number,
    EnableGzipCompressionSummary : String,
    LeverageBrowserCachingName : String,
    LeverageBrowserCachingImpact : Number,
    LeverageBrowserCachingSummary :String,
    ServerResponseTimeName : String,
    ServerResponseTimeImpact : Number,
    ServerResponseTimeSummary : String,
    MinifyCssName : String,
    MinifyCssImpact : Number,
    MinifyCssSummary : String,
    MinifyHTMLName : String,
    MinifyHTMLImpact : Number,
    MinifyHTMLSummary : String,
    MinifyJavaScriptName : String,
    MinifyJavaScriptImpact : Number,
    MinifyJavaScriptSummary : String,
    MinimizeRenderBlockingName : String,
    MinimizeRenderBlockingImpact : Number,
    MinimizeRenderBlockingSummary : String,
    OptimizeImagesName : String,
    OptimizeImagesImpact : Number,
    OptimizeImagesSummary : String,
    PrioritizeVisibleContentName : String,
    PrioritizeVisibleContentImpact : Number,
    PrioritizeVisibleContentSummary : String,
  //  screenshotData : Buffer,
    screenshotPath : String,
    screenshotType : String,
    screenshotwidth : Number,
    screenshotHeight : Number
    // onload_time: Number,
    //  page_elements: Number,
    //  report_url: String,
    //  redirect_duration: Number,
    //  first_paint_time: Number,
    //  dom_content_loaded_duration: Number,
    //  dom_content_loaded_time: Number,
    //  dom_interactive_time: Number,
    //  page_bytes: Number,
    //  page_load_time: Number,
    //  html_bytes: Number,
    //  fully_loaded_time: Number,
    //  html_load_time: Number,
    //  rum_speed_index: Number,
    //  yslow_score: Number,
    //  pagespeed_score: Number,
    //  backend_duration: Number,
    //  onload_duration: Number,
    //   connect_duration: Number


    }


    // imgPath:String,
    // targeturl:String

});

var Tests = mongoose.model('Tests',testSchema);
module.exports = Tests;
