function randomPokemon() {
    dexno = Math.floor((Math.random()*647)+1);
    $("#whos-this-pokemon").src = "pokemon/"+dexno+".png"
}