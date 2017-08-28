const passmarked = require('passmarked');
var Report = require('../models/report.js');
var User = require('../models/user.js');

module.exports = {
  testUrl(targeturl,UserId , req, res) {

    passmarked.create({
    url:    targeturl,
      token : 'PM_10ed7f3078a011e7a46985aa61769a0d5991501801453219'
    //  token:   'PM_72dc0050757a11e7bfd8797c6d1b46895961501455443157'
  }).on('done', function(result) {
    // if(err){
    //   res.json(err);
    // }

    result = result.toJSON();
    let issues = result.issues;
    let issuesGroupedByCategory = {};
    issues.forEach( (issue) => {
        issuesGroupedByCategory[issue.category] = issuesGroupedByCategory[issue.category] || [];
        issuesGroupedByCategory[issue.category].push(issue);
    });

    let stats = result.tests;
    let tests_Count = stats.length;
    let testStatsGroupedByCategory = {};
      stats.forEach( (test_stats) => {
    testStatsGroupedByCategory[test_stats.category] = testStatsGroupedByCategory[test_stats.category] || [];
    testStatsGroupedByCategory[test_stats.category].push(test_stats);
    });

    var report = {
    report_id : result.uid,
    date : result.created,
    page_Score : result.score,
    test_Number : tests_Count,
    page_Size : result.size,
    page_Speed : result.loadtime,
    city : result.city,
    server_IP : result.client,
    total_Issues : result.count,
    report_Date : result.created,
    critical_Number : result.criticals,
    error_Number : result.errors,
    notice_Number : result.notices,
    warnings_Number : result.warnings,
    url : result.url,
    filmstrip : result.filmstrip,
    mobile_screenShot : result.previews[0],
    desktop_screenShot : result.previews[1],
    requests_Number : result.requests,
    issues : issuesGroupedByCategory,
    stats_By_Category : testStatsGroupedByCategory,
    user_id : UserId
    }


    Report.create(report, function(err){

         if(err){
      res.json(err);
       }
         });


     res.json(report);

    }).on('update', function(result) {

    console.log(result.countPendingTests() + '/' + result.countTests())
    }).start(function(err) {
    if (err) {
    res.json(err);
    } else {
      console.log('Report started')
    }
    })
  }
}
