// Store time when key is pressed down
var keyDown_arr = [];
// Store time when key is released
var keyUp_arr = [];
// Keyboard pressed down time - computed from KeyUp[i] - KeyDown[i]
var key_down_time_arr = [];
// In-between time keyboard press - can be negative if type fast
var in_between_arr = [];

var password_field = document.getElementById("password");
password_field.addEventListener('keydown', function (e) {
    //console.log(e.keyCode);
    if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 65 && event.keyCode <= 90)) {
        var down_date = new Date();
        var timeStamp = down_date.getTime();
        keyDown_arr.push(timeStamp);
        //console.log(timeStamp);
    }
}, true);

password_field.addEventListener('keyup', function(e) {
    //console.log(e.keyCode);
    if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 65 && event.keyCode <= 90)) {
        var up_date = new Date();
        var timeStamp = up_date.getTime();
        keyUp_arr.push(timeStamp);
        //console.log(timeStamp);
    }
}, true);

function login_action() {
    // Handle Post request
    var username = document.getElementsByName('username')[0].value;
    var password = document.getElementsByName('password')[0].value;

    console.log("Login_action_pressed");
    compute_key_down_time();
    console.log(key_down_time_arr);
    console.log(in_between_arr);
    //post_request();
}

function compute_key_down_time() {
    console.log(keyUp_arr.length);
    console.log(keyDown_arr.length);
    for (i = 0; i < keyUp_arr.length; i++)  {
        key_down_time_arr[i] = keyUp_arr[i] - keyDown_arr[i];
    }
    for (t = 1; t < keyDown_arr.length; t++) {
        in_between_arr[t-1] = keyDown_arr[t] - keyUp_arr[t-1];
    }
}

function post_request() {
    // Post to the Node server endpoint

    // Send the Password and Username for first level authentication

    // Send the three data arrays
}
