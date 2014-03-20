function randomPokemon() {
    var dexno = Math.floor((Math.random()*718)+1);
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
    /*$("#pkmn-name").keypress(function(event){
        if(event.which == 13){
            // Do stuff when Enter key is pressed
            $.ajax({
                url: "/submit",
                type: "POST",
                data: {
                    pokemonName: $('input[name="pkmn-name"]').val()
                }
            });

        }
    });*/
});

$(function(){
    $('#pkmn-name').on('keyup', function(e){
        if(e.keyCode === 13) {
            var parameters = { 
                pokemonName: $('input[name="pkmn-name"]').val()
            };
            $.ajax({
                url: "/submit",
                dataType: "json",
                type: "GET",
                data: {
                    pokemonName: $('input[name="pkmn-name"]').val(),
                    dexNo: $("#whos-this-pokemon").attr('dexno')
                }
            }).done(function(data) {
                    //alert('here');
                    console.log(data.correct);
                    if (data.correct) {
                        $('#result').html("Correct answer! :D");
                        $('#result').css("color", "#00FF00");
                        var counter = Number($('#counter').text());
                        counter++;
                        $('#counter').text(String(counter));
                        $('#pkmn-name').val("");
                        randomPokemon();
                        /*$.ajax({
                            url: "/",
                            dataType: "json",
                            type: "GET",
                            data: {
                                counter: counter
                                //pokemonName: $('input[name="pkmn-name"]').val(),
                                //dexNo: $("#whos-this-pokemon").attr('dexno')
                            }
                        }).done(randomPokemon());*/
                    } else {
                        $('#result').html("Incorrect answer! :(");
                        $('#result').css("color", "#000000");
                    }
                });
            /*$.get('/submit', parameters, function(data) {
                alert('here');
                console.log(data);
                $('#result').html(data);
            });*/
        };
    });
});
