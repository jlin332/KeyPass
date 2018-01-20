// In-between time keyboard press
var in_between_arr = [];

// Keydown Time
var keyDown_arr = [];

// KeyUp Time
var keyUp_arr = [];

// Keyboard pressed down time - computed from KeyUp[i] - KeyDown[i]
var key_down_time_arr = [];

var password_field = document.getElementById("password");
password_field.addEventListener('keypress', function (e) {
    var timeStamp = Date.getTime();
    keyDown_arr.push(e.key);
    console.log(e.key);
    console.log(keyDown_arr);
}, true);

function login_action() {
    // Handle Post request
    var username = document.getElementsByName('username')[0].value;
    var password = document.getElementsByName('password')[0].value;
    //in_between_arr.push(username)
    //in_between_arr.push(password)
    console.log("Login_action_pressed");
    console.log(keyDown_arr);
    //post_request();
}


function post_request() {
    // Post to the Node server endpoint

    // Send the Password

    // Send the three data arrays
}
