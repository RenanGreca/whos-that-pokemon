var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var http = require('http');
var fs  = require("fs");
var counter = 0;

var options = {
  user: 'admin',
  pass: 'Yc9YwUTt_uf-'
}

mongoose.connect('mongodb://127.0.0.1/pokemon');
//mongoose.connect('mongodb://127.13.13.130/pokemon', options);
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
// Use ejs as the view engine
app.set('view engine', 'ejs');


// Indicate directory of static files
app.use(express.static(path.join(__dirname, 'public')));
//app.use(app.router);

//app.set('views', (path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    //console.log("rendering index");
    //res.contentType('json');
    //counter = req.query.dexNo;
    counter = 0;
    res.render('index');
});

app.get('/fillDex', function(req, res) {
    var pokedex = fs.readFileSync("pokemon.txt").toString().split("\n");
    for(i in pokedex) {
        //console.log(pokedex[i]);
        pkmn = pokedex[i].toString().split("|");
        //console.log(pkmn);
        //Pokemon.findOne({_id:pkmn[0]}, function(err, result){
           // console.log(result);
            //if (!result) {
		//console.log(pkmn);
                addPokemon(pkmn);
            //}
        //});
    }
    res.render('index');
});

function addPokemon(pkmn) {
    var gen;
    var dexno = pkmn[0];
    var name = pkmn[1].toLowerCase();
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
    //console.log(dexno+" "+name+" "+typea+" "+typeb+" "+gen);
    var pokemon = new Pokemon ({
        _id: dexno,
        eng_name: name,
        type1: typea,
        type2: typeb,
        gen: gen
    });

    pokemon.save(function(err){
                //save line
                if (err) {
                    throw err; 
                    console.log('pokemon not saved');
                }
                console.log('saved pokemon to database');
                });
    return pokemon;
}

/*var http = require('http'); 
http.createServer(function (req, res) {
    if (req.method == 'POST'){
        var pokemonName = req.body.pokemonName;
        console.log(pokemonName);
    }
});*/

// When return is pressed, this is called.
app.get('/submit', function(req, res) {
    //pokemonName = req.query.pokemonName;
    //dexNo = req.query.dexNo;
    res.contentType('json');
    
    console.log(req.query.dexNo+" "+req.query.pokemonName);

    Pokemon.findOne({_id:req.query.dexNo, eng_name: req.query.pokemonName.toLowerCase()}, function(err, pkmn){
        //console.log("Found Pokemon: "+ pkmn);
        if (pkmn) {
            //console.log('Correct answer!');
            counter++;
            res.send({correct: true, counter: counter});
        } else {
            //console.log('Incorrect answer!');
            res.send({correct: false, counter: counter});
        }
    });
    //console.log('Correct answer!');
    //res.send('Correct answer');
    //res.send({ some: JSON.stringify({response:'json'}) });
});

/*app.get('/?dexNo', function(req, res) {
    res.render('index');
});*/

/*app.get('/', function(request, response, next) {
  response.redirect(__dirname + '/index.html');
});*/

/*
UNCOMMENT BEFORE PUSHING

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
app.listen( port, ipaddress, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});*/

app.listen(3000);//, '0.0.0.0');
console.log('Server is listening on port 3000')
