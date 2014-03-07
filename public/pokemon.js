function randomPokemon() {
    var dexno = Math.floor((Math.random()*657)+1);
    $("#whos-this-pokemon").attr(
        'src',
        "/pokemon/"+dexno+".png"
    );
    $("#whos-this-pokemon").attr(
        'dexno',
        dexno
    );
}

$( document ).ready(function() {
    randomPokemon();
});

$("#pkmn-name").keyup(function(event){
    if(event.keyCode == 13){
        // Do stuff when Enter key is pressed
    }
});