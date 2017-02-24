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
        'damage_taken': 0,
        "damage_taken": 0,
        "moves": {
            "attack": 0,
            "block": 0,
            "evade": 0
        }
    };
}
