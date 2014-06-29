function randomPokemon() {
    do {
        var dexno = Math.floor((Math.random()*718)+1);
    } while (seen.indexOf(dexno) != -1); // Impedes repetition
    seen.push(dexno)
    if (silhouetteMode) {
        $("#whos-this-pokemon").attr(
            'src',
            "/silhouettes/"+dexno+"_s.png"
        );

    } else {
        $("#whos-this-pokemon").attr(
            'src',
            "/pokemon/"+dexno+".png"
        );    
    }
    $("#whos-this-pokemon").attr(
        'dexno',
        dexno
    );
}

$( document ).ready(function() {
    seen = [];
    silhouetteMode = false;
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
                    //$('#result').html("Correct answer! :D");
                    $('#result').css("color", "#00FF00");
                    //var counter = Number($('#counter').text());
                    //counter++;
                    $('#counter').text(String(data.counter));
                    //$('.twitter-share-button').attr('text', "I scored "+String(data.counter)+" in Who's That Pokémon!");
                    //twttr.widgets.load()
                    //twttr.widgets.createShareButton('http://whosthatpokemon.net', '.twitter-share-button', function(el){}, { text: "I scored "+String(data.counter)+" in Who's That Pokémon!" });
                    var href = $('#custom-tweet-button').attr('href');
                    $('#custom-tweet-button').attr('href', href+"?text=" + encodeURIComponent("I scored "+String(data.counter)+" in Who's That Pokémon! http://whosthatpokemon.net #WhosThatPokemon"));
                    $('#pkmn-name').val("");
                    randomPokemon();
                } else {
                    //$('#result').html("Incorrect answer! :(");
                    $('#result').css("color", "#000000");
                    // Makes box shake
                    $('#name-box').jrumble({
                        x: 5,
                        y: 0,
                        rotation: 0
                    });
                    $('#name-box').trigger('startRumble');
                    setTimeout(function(){$('#name-box').trigger('stopRumble')},300)
                }
            });
        };
    });
});

//$('#b').attr('href', "https://twitter.com/intent/tweet?hashtags=WhosThatPokemon&original_referer=http%3A%2F%2Flocalhost%3A3000%2F&text=I%20scored%20100%20in%20Who%27s%20That%20Pok%C3%A9mon!&tw_p=tweetbutton&url=http%3A%2F%2Fwhosthatpokemon.net");

