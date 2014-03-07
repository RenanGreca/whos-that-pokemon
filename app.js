var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var http = require('http');
var fs  = require("fs");

mongoose.connect('mongodb://localhost/whos-that-pokemon');
var pokemon_schema = mongoose.Schema({
    _id: Number,
    eng_name: String,
    alt_name: String,
    type1: String,
    type2: String,
    gen: String
});

var Pokemon = mongoose.model('Pokemon', pokemon_schema);

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

app.get('/fillDex', function(req, res) {
    var pokedex = fs.readFileSync("pokemon.txt").toString().split("\n");
    for(i in pokedex) {
        //console.log(pokedex[i]);
        pkmn = pokedex[i].toString().split("|");
        console.log(pkmn);
        addPokemon(pkmn);
    }
    res.render('index');
});

function addPokemon(pkmn) {
    var gen;
    var dexno = pkmn[0];
    var name = pkmn[1];
    var typea = pkmn[2];
    var typeb;
    if (pkmn[3])
        typeb = pkmn[3];
    else
        typeb = "";
    if (dexno <= 151) {
        gen = "I";
    } else if (dexno <= 251) {
        gen = "II";
    } else if (dexno <= 386) {
        gen = "III";
    } else if (dexno <= 493) {
        gen = "IV";
    } else if (dexno <= 649) {
        gen = "V";
    } else {
        gen = "VI";
    }

    var pokemon = new Pokemon ({
        _id: dexno,
        eng_name: name,
        type1: typea,
        type2: typeb,
        gen: gen
    });

    pokemon.save();
    return pokemon;
}

/*app.get('/', function(request, response, next) {
  response.redirect(__dirname + '/index.html');
});*/

app.listen(3000);//, '0.0.0.0');