'use strict'
var mongoose = require('mongoose');
var reportSchema = mongoose.Schema({
  report_id : String,
  date : Date,
  user_email : String,
  page_Score : String,
  test_Number : String,
  page_Size : String,
  page_Speed : String,
  city : String,
  server_IP : String,
  total_Issues : String,
  report_Date : String,
  critical_Number : String,
  error_Number : String,
  notice_Number : String,
  warnings_Number : String,
  url : String,
  filmstrip : [],
  mobile_screenShot : {},
  desktop_screenShot : {},
  requests_Number : String,
  issues : {},
  stats_By_Category : {},
  user_id  : String

});

var Report = mongoose.model('Report',reportSchema);
module.exports = Report;
