// Sets up global variables and gets the first random Pokémon
$( document ).ready(function() {
    seen = [];
    silhouetteMode = false;
    randomPokemon();  
    href = $('#custom-tweet-button').attr('href');
});

// Gets a random pokémon from the database
function randomPokemon() {
    do {
        var dexno = Math.floor((Math.random()*718)+1);
    } while (seen.indexOf(dexno) != -1); // No repetition
    seen.push(dexno);
    render(dexno);
    $("#whos-this-pokemon").attr(
        'dexno',
        dexno
    );
}

// Switches silhouette mode on and off
function silhouetteTrigger(button) {
    silhouetteMode=!silhouetteMode;
    button.value='off';
    //randomPokemon();
    dexno = $("#whos-this-pokemon").attr('dexno');
    render(dexno);
}

// Displays the Pokémon
function render(dexno) {
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
}

// When the return key is pressed, this does the AJAX magic
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
                console.log(data.correct);
                if (data.correct) {
                    //$('#result').html("Correct answer! :D");
                    $('#result').css("color", "#00FF00");
                    var counter = Number($('#counter').text());
                    counter++;
                    $('#counter').text(String(counter));
                    $('#custom-tweet-button').attr('href', href+"?text=" + encodeURIComponent("I scored "+String(data.counter)+" in Who's That Pokémon! http://whosthatpokemon.net #WhosThatPokemon"));
                    $('#pkmn-name').val("");
                    randomPokemon();
                } else {
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
