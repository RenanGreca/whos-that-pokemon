var express = require('express');
var mongoose = require('mongoose');
var path = require('path');

mongoose.connect('mongodb://localhost/whos-that-pokemon');
var pokemon_schema = mongoose.Schema({
    _dexno: Number,
    eng_name: String,
    alt_name: String,
    type1: String,
    type2: String,
    gen: String
});

var app = express();
app.configure(function() {
    // Use ejs as the view engine
    app.set('view engine', 'ejs');
    
    app.use(express.cookieParser());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.session({ 'secret': 'whisper' }));
    
    // Indicate directory of static files
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(app.router);
    //app.set('views', (path.join(__dirname, 'public')));
});

app.get('/', function(req, res) {
    res.render('index');
});

/*app.get('/', function(request, response, next) {
  response.redirect(__dirname + '/index.html');
});*/
        
app.listen(8080);