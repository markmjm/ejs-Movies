var express = require('express');
var app = express();
var request = require("request")

app.use(express.static("public"));
app.set("view engine", "ejs")

app.get("/", function(req, res){
    res.render("search", {title: "Look for Movies"});
});

app.get("/results", function (req, res) {
    let searchTerm = req.query.searchTerm;
    request("http://omdbapi.com/?s=" + searchTerm + "&apikey=thewdb", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("results", {data: data, title: "movies"})
        }
    })
});


//must be last
app.get("*", function (req, res) {
    res.send("Sorry, page not found.");
})

//if you want to use a different port
//in DOS command : set PORT=8000 for example.
var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!');
});