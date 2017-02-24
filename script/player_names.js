// player_names.js
function prompt_names() {
    var title = prompt('Please enter the player names with vs in-between, seperated by space');
    var name_data = title.split(' ');
    if (name_data.length > 3 || name_data[1] != "vs") {
        prompt_names();
    } else {
        document.title = title;
        return [name_data[0], name_data[1]];
    }

}
