// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//GET Call for Date Function

app.get("/api/timestamp/:dateVal", function (req, res, next){
    var dateVal = req.params.dateVal;
    
    var months = ["January","February","March",
                        "April","May","June",
                        "July","August","September",
                        "October","November","December"];
    
    var numRegex = new RegExp(/-/gm);
    console.log(numRegex.test(dateVal));
    

    if (numRegex.test(dateVal)){
        //create new valid Date object to act on
        var d = dateVal.replace(numRegex, ",");
        var date = new Date(d);

        //find the natural date in FULLMONTH + Number Date + Full Year
        var natDate = months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() ;

        //convert date into Unix
        var unixDate = new Date(dateVal).getTime()/1000;

        //return the formatted values
        res.json({unix: unixDate, natural: natDate});

    }
    else if (dateVal.length === 10){

        //convert unix to date obj
        var date = new Date(dateVal*1000);

        //find the natural date in FULLMONTH + Number Date + Full Year
        var natDate = months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear();

        //date is already in unix format pass to variable;
        var unixDate = parseInt(dateVal);

        res.json({unix: unixDate, natural: natDate});
    }
    
    //if both conditions are not met return null object
    else{
        res.json({"unix": null, "utc" : "Invalid Date" });
    }
    
  })



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});