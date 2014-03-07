function randomPokemon() {
    var dexno = Math.floor((Math.random()*647)+1);
    $("#whos-this-pokemon").attr(
        'src',
        "pokemon/"+dexno+".png"
    );
}

$( document ).ready(function() {
    randomPokemon();
});