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

// Development database
//mongoose.connect('mongodb://127.0.0.1/pokemon');

// Production database
mongoose.connect('mongodb://127.13.13.130/pokemon', options);

var pokemon_schema = mongoose.Schema({
    _id: Number,
    dexno: Number,
    name: String,
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
    counter = 0;
    res.render('index');
});

// This is only used when re-filling the database
/*app.get('/fillDex', function(req, res) {
    var pokedex = fs.readFileSync("pokemon.txt").toString().split("\n");
    id = 0;
    for(i in pokedex) {
        pkmn = pokedex[i].toString().split("|");
        addPokemon(pkmn, id++);
    }
    res.render('index');
});

function addPokemon(pkmn, id) {
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

    var pokemon = new Pokemon ({
        _id: id,
        dexno: dexno,
        name: name,
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
}*/

// When return is pressed, this is called.
app.get('/submit', function(req, res) {
    res.contentType('json');
    
    console.log(req.query.dexNo+" "+req.query.pokemonName);

    Pokemon.findOne({_id:req.query.dexNo, eng_name: req.query.pokemonName.toLowerCase()}, function(err, pkmn){
        if (pkmn) {
            counter++;
            res.send({correct: true, counter: counter});
        } else {
            res.send({correct: false, counter: counter});
        }
    });
});

// THIS IS FOR PRODUCTION
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
app.listen( port, ipaddress, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

// THIS IS FOR LOCAL TESTING
/*app.listen(3000);//, '0.0.0.0');
console.log('Server is listening on port 3000');*/
