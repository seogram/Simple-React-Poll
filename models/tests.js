'use strict'
var mongoose = require('mongoose');
var testSchema = mongoose.Schema({
  resources : {
    report_pdf: String,
     pagespeed: String,
     har: String,
     pagespeed_files: String,
     report_pdf_full: String,
     yslow: String,
     screenshot: String
  },
  results : {
    onload_time: Number,
     page_elements: Number,
     report_url: String,
     redirect_duration: Number,
     first_paint_time: Number,
     dom_content_loaded_duration: Number,
     dom_content_loaded_time: Number,
     dom_interactive_time: Number,
     page_bytes: Number,
     page_load_time: Number,
     html_bytes: Number,
     fully_loaded_time: Number,
     html_load_time: Number,
     rum_speed_index: Number,
     yslow_score: Number,
     pagespeed_score: Number,
     backend_duration: Number,
     onload_duration: Number,
      connect_duration: Number
    },
    imgPath:String,
    targeturl:String

});

var Tests = mongoose.model('Tests',testSchema);
module.exports = Tests;
