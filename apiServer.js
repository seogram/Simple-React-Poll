
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cookieParser());

//Gtmetrix API Config
const EMAIL = 'pamo@wmail.club';
const APIKEY = '052e3a2e9e948d997e774bd8b34849d3';
const BROWSER = 3;


const fs = require('fs');

// APIs
//mongoose.connect('mongodb://localhost:27017/bookshop');
mongoose.connect('mongodb://test:12345@ds151452.mlab.com:51452/bookshop');

var db = mongoose.connection;
db.on('error',console.error.bind(console,'#Monodd-Connection error'));
// ----> Setup session ---- //
app.use(session({
    secret: 'mySecrett',
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    cookie : {maxAge : 1000*60*60*24*2},
    store: new mongoStore({
        mongooseConnection : db,
        ttl: 24 * 3600 // time period in seconds
    })
}));
// SAVE SESSION CART API
app.post('/cart', function(req, res){
var cart = req.body;
req.session.cart = cart;
req.session.save(function(err){
if(err){
  console.log('saving to cart error');
}
res.json(req.session.cart);
})
});
// GET SESSION CART API
app.get('/cart', function(req, res){
if(typeof req.session.cart !=='undefined'){
res.json(req.session.cart);
}
});
//---- End session -------- //
var Books = require('./models/books.js');
//---->>> POST BOOKS <<<-----
app.post('/books', function(req, res){
 var book = req.body;
 Books.create(book, function(err, books){
 if(err){
   console.log('saving book error');
 }
 res.json(books);
 })
});
//----->>>> GET BOOKS <<<---------
app.get('/books', function(req, res){
Books.find(function(err, books){
if(err){
  console.log('getting book list error');
}
res.json(books)
})
});
//---->>> DELETE BOOKS <<<------
app.delete('/books/:_id', function(req, res){
var query = {_id: req.params._id};
Books.remove(query, function(err, books){
if(err){
  console.log('remove book error');
}
res.json(books);
})
});
//---->>> UPDATE BOOKS <<<------
app.put('/books/:_id', function(req, res){
var book = req.body;
var query = req.params._id;

var update = {'$set':{
 title:book.title,
 description:book.description,
 image:book.image,
 price:book.price
 }
 };
 // When true returns the updated document
 var options = {new: true};
 Books.findOneAndUpdate(query, update,
options, function(err, books){
 if(err){
   console.log('update book error');
 }
 res.json(books);
 })
})
// END APIs

//Get books images API
app.get('/images',function(req,res){
  const imgFolder = __dirname + '/public/images';
  //require file system
  //read all files in the directory
  fs.readdir(imgFolder,function(err,files){
    if(err){
    return  console.error(err);
    }
    //return an empty array
    const fileArr = [];
    files.forEach(function(file){
      fileArr.push({name : file})
    })
    res.json(fileArr);
  });
});

// url test api
var Tests = require('./models/tests.js');
//app.get('/testUrl/:url', function(req, res){
//  var targeturl = req.param.url;

app.get('/testUrl/', function(req, res){

  var targeturl = req.query.url;
  var MyStrategy = req.query.strategy;
  console.log('url from server',targeturl);
  console.log('strategy',MyStrategy);


//Google pagespeed API call
var https = require('https'),
    key = 'AIzaSyCXzfS8daIlAWPsDNHEdjVdf8DvErHPU6U',
    url = targeturl,
    screenshot=true,
    strategy = MyStrategy;

    https.get({
host: 'www.googleapis.com',
path: '/pagespeedonline/v1/runPagespeed?url=' + encodeURIComponent(url) +
'&key='+key+'&strategy='+strategy+'&screenshot='+screenshot
}, function(resPageSpeed) {
    var json = "";
    resPageSpeed.on('data', function(d) {
    json += d;
    });
    resPageSpeed.on('end', function(){
    json = JSON.parse(json);

  //Converting screenshot to 64bit image
        var id = Math.floor(Math.random() * 200000000);
        const imgPath = __dirname + '/public/images/'+'screenshot'+id+'.jpeg';
        var newScreenshot = json.screenshot.data.replace(/_/g,'/').replace(/-/g,'+');
      // require("fs").writeFile("out.jpeg", base64Data, 'base64', function(err) {
        fs.writeFile (imgPath, newScreenshot,'base64', function(err){
          console.log(err);
        });
         var imgSrc = 'screenshot'+id+'.jpeg' ;

      var pageSpeedData = {
               desktop :{
                 title: json.title,
                 targeturl : json.id,
                 score : json.score ,
                 htmlResponseBytes : json.pageStats.htmlResponseBytes ,
                 cssResponseBytes : json.pageStats.cssResponseBytes,
                 imageResponseBytes : json.pageStats.imageResponseBytes,
                 javascriptResponseBytes : json.pageStats.javascriptResponseBytes,
                 LandingPageRedirectsName : json.formattedResults.ruleResults.AvoidLandingPageRedirects.localizedRuleName,
                 LandingPageRedirectsImpact : json.formattedResults.ruleResults.AvoidLandingPageRedirects.ruleImpact.toFixed(2),
                 LandingPageRedirectsSummary :json.formattedResults.ruleResults.AvoidLandingPageRedirects.urlBlocks[0].header.format,
                 EnableGzipCompressionName : json.formattedResults.ruleResults.EnableGzipCompression.localizedRuleName,
                 EnableGzipCompressionImpact : json.formattedResults.ruleResults.EnableGzipCompression.ruleImpact.toFixed(2),
                 EnableGzipCompressionSummary : json.formattedResults.ruleResults.EnableGzipCompression.urlBlocks[0].header.format,
                 LeverageBrowserCachingName : json.formattedResults.ruleResults.LeverageBrowserCaching.localizedRuleName,
                 LeverageBrowserCachingImpact : json.formattedResults.ruleResults.LeverageBrowserCaching.ruleImpact.toFixed(2),
                 LeverageBrowserCachingSummary : json.formattedResults.ruleResults.LeverageBrowserCaching.urlBlocks[0].header.format,
                 ServerResponseTimeName : json.formattedResults.ruleResults.MainResourceServerResponseTime.localizedRuleName,
                 ServerResponseTimeImpact : json.formattedResults.ruleResults.MainResourceServerResponseTime.ruleImpact.toFixed(2),
                 ServerResponseTimeSummary : json.formattedResults.ruleResults.MainResourceServerResponseTime.urlBlocks[0].header.format,
                 MinifyCssName : json.formattedResults.ruleResults.MinifyCss.localizedRuleName,
                 MinifyCssImpact : json.formattedResults.ruleResults.MinifyCss.ruleImpact.toFixed(2),
                 MinifyCssSummary : json.formattedResults.ruleResults.MinifyCss.urlBlocks[0].header.format,
                 MinifyHTMLName : json.formattedResults.ruleResults.MinifyHTML.localizedRuleName,
                 MinifyHTMLImpact : json.formattedResults.ruleResults.MinifyHTML.ruleImpact.toFixed(2),
                 MinifyHTMLSummary : json.formattedResults.ruleResults.MinifyHTML.urlBlocks[0].header.format,
                 MinifyJavaScriptName : json.formattedResults.ruleResults.MinifyJavaScript.localizedRuleName,
                 MinifyJavaScriptImpact : json.formattedResults.ruleResults.MinifyJavaScript.ruleImpact.toFixed(2),
                 MinifyJavaScriptSummary : json.formattedResults.ruleResults.MinifyJavaScript.urlBlocks[0].header.format,
                 MinimizeRenderBlockingName : json.formattedResults.ruleResults.MinimizeRenderBlockingResources.localizedRuleName,
                 MinimizeRenderBlockingImpact : json.formattedResults.ruleResults.MinimizeRenderBlockingResources.ruleImpact.toFixed(2),
                 MinimizeRenderBlockingSummary : json.formattedResults.ruleResults.MinimizeRenderBlockingResources.urlBlocks[1].header.format,
                 OptimizeImagesName : json.formattedResults.ruleResults.OptimizeImages.localizedRuleName,
                 OptimizeImagesImpact : json.formattedResults.ruleResults.OptimizeImages.ruleImpact.toFixed(2),
                 OptimizeImagesSummary : json.formattedResults.ruleResults.OptimizeImages.urlBlocks[0].header.format,
                 PrioritizeVisibleContentName : json.formattedResults.ruleResults.PrioritizeVisibleContent.localizedRuleName,
                 PrioritizeVisibleContentImpact : json.formattedResults.ruleResults.PrioritizeVisibleContent.ruleImpact.toFixed(2),
                 PrioritizeVisibleContentSummary : json.formattedResults.ruleResults.PrioritizeVisibleContent.urlBlocks[0].header.format,
                 //screenshotData : newScreenshot,
                 screenshotPath : imgSrc,
                 screenshotType : 'image/png',
                 screenshotwidth : json.screenshot.width,
                 screenshotHeight : json.screenshot.height
               }
        };
        console.log(pageSpeedData);
        //Save to database
          Tests.create(pageSpeedData, function(err){
             if(err){
           console.log(err);
           }
             });
              res.json(pageSpeedData);

    });

}).on('error', function(e) {
console.error(e);
});


//Get Previous test results when the main test page is loaded
});

app.get('/test',function(req,res){
  Tests.find(function(err, tests){
  if(err){
    console.log('getting previous results failed')
  }
  res.json(tests)
});
});

app.listen(3001, function(err){
 if(err){
 return console.log(err);
 }
 console.log('API Sever is listening on http://localhost:3001');
});
