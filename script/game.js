// game.js


is_turn = 0;
// init.js

function init_game() {
    var title = prompt('Please enter the player names with vs in-between, seperated by space');
    var name_data = title.split(' ');
    if (name_data.length != 3 || name_data[1] != "vs") {
        prompt_names();
    } else {
        document.title = title;
        console.log(name_data);

        players[0] = createPlayer(name_data[0]);
        players[1] = createPlayer(name_data[2]);

    }
    console.log(players);
}
// players will start with health: 100 and their names set

function createPlayer(name) {
    return {
        'name': name,
        'health': 100,
        'damage_done': 0,
        "damage_taken": 0,
        "moves": {
            "attack": 0,
            "block": 0,
            "evade": 0
        }
    };
}

function next_turn()
{
	is_turn = Number(! is_turn);
}


function toogle_player_disable(player)
{
	var is_disabled = player.getElementsByTagName('button')[0].disabled;
	player.getElementsByTagName('button')[0].disabled = !is_disabled;
	player.getElementsByTagName('button')[1].disabled = !is_disabled;
	player.getElementsByTagName('button')[2].disabled = !is_disabled;
}


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
    toogle_player_disable(player1);
    toogle_player_disable(player2);
    next_turn();

}

function attack(player_id, oppenent_id) {
    turn_start(player_id, oppenent_id);
    players[player_id].damage_done = players[oppenent_id].moves.attack;
    players[oppenent_id].damage_taken = players[player_id].moves.attack;
    console.log(players[oppenent_id]);
    turn_finish();
}

function block(player_id, oppenent_id) {
    turn_start(player_id, oppenent_id);
    players[player_id].damage_done = 0;
    players[player_id].damage_taken = Math.abs(players[oppenent_id].moves.attack - players[player_id].moves.block);
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
