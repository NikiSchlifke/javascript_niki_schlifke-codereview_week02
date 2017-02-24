// game.js




function set_player_names() {

    player1_name_field = player1.getElementsByClassName('name')[0];
    player1_name_field.innerHTML = players[0].name;
    player2_name_field = player2.getElementsByClassName('name')[0];
    player2_name_field.innerHTML = players[1].name;
}


function generate_moves_strength(is_turn) {
    // roll a dice with number of faces with face_count
    function roll(face_count) {
        return Math.round(Math.random() * face_count + 1);
    }
    if (is_turn) {
        var values = {
            "attack": roll(6),
            "block": roll(6),
            "evade": roll(6)
        }

    } else {
        var values = {
            "attack": 0,
            "block": 0,
            "evade": 0
        }    
    }
    console.log(values.attack+ ', ' + values.block + ', ' + values.evade)
    return values;

}

function game_over(player_id) {
    // body...
}

function turn_start(player_id, oppenent_id) {

    if (players[0].health <= 0) {
        game_over(0)
    }
    if (players[1].health <= 0) {
        game_over(1)
    }

    players[player_id].moves = generate_moves_strength(true);
    players[oppenent_id].moves = generate_moves_strength(false);
	console.log(players);

    
}

function turn_finish() {
    var player1 = document.getElementById('player1');
    var player2 = document.getElementById('player2');

    // console.log(player1.getElementsByClassName('health')[0].innerHTML);
    // console.log(player2.getElementsByClassName('health')[0].innerHTML);
    players[0].health -= players[0].damage_taken;
    players[1].health -= players[1].damage_taken;
    player1.getElementsByClassName('health')[0].innerHTML = players[0].health;
    player2.getElementsByClassName('health')[0].innerHTML = players[1].health;
}

function attack(player_id, oppenent_id) {
    turn_start(player_id, oppenent_id);
    players[player_id].damage_done = players[player_id].moves.attack;
    players[player_id].damage_taken = players[oppenent_id].moves.attack;
    turn_finish();
}

function block(player_id, oppenent_id) {
    turn_start(player_id, oppenent_id);
    players[player_id].damage_done = 0;
    players[player_id].damage_taken = players[oppenent_id].moves.attack - players[player_id].moves.block;
    turn_finish();
}

function evade(player_id, oppenent_id) {
    turn_start(player_id, oppenent_id);
    players[player_id].damage_done = 0;
    if (Math.random() * players[player_id].moves.block > 3) {
        players[player_id].damage_taken = players[oppenent_id].moves.attack;
    }
    turn_finish();
}
