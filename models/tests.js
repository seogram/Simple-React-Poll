'use strict'
var mongoose = require('mongoose');
var testSchema = mongoose.Schema({

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
    }
});

var Tests = mongoose.model('Tests',testSchema);
module.exports = Tests;
