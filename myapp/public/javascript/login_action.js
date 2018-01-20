// Store time when key is pressed down
var keyDown_arr = [];
// Store time when key is released
var keyUp_arr = [];
// Keyboard pressed down time - computed from KeyUp[i] - KeyDown[i]
var key_down_time_arr = [];
// In-between time keyboard press - can be negative if type fast
var in_between_arr = [];

var authenticate = false;

var authentication_toggle = document.getElementById("authenticate");
authentication_toggle.addEventListener('change', function() {
    var password_field = document.getElementById("password");
    if(this.checked) {
        password_field.addEventListener('keydown', appendToKeyDown, true);
        password_field.addEventListener('keyup', appendToKeyUp, true);
        authenticate = true;
    } else {
        authenticate = false;
        console.log("unchecked");
        password_field.removeEventListener('keydown', appendToKeyDown, true);
        password_field.removeEventListener('keyup', appendToKeyUp, true);
    }
});

var appendToKeyDown = function(e) {
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90)) {
        var down_date = new Date();
        var timeStamp = down_date.getTime();
        keyDown_arr.push(timeStamp);
        //console.log(timeStamp);
    }
}

var appendToKeyUp = function(e) {
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90)) {
        var up_date = new Date();
        var timeStamp = up_date.getTime();
        keyUp_arr.push(timeStamp);
        //console.log(timeStamp);
    }
}

function login_action() {
    // Handle Post request
    console.log("Login_action_pressed");
    var username = document.getElementsByName('username')[0].value;
    var password = document.getElementsByName('password')[0].value;
    compute_key_down_time();
    console.log(key_down_time_arr);
    console.log(in_between_arr);
    post_request(username, password);
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

function post_request(username, password) {
    // Post to the Node server endpoint
    var http = new XMLHttpRequest();
    console.log("start POST request");
    http.open("POST", "/train", true); // http://127.0.0.1:1337/ replace with our server
    //http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //http.open("GET", "/test", true);
    // Send the Password and Username for first level authentication
    //http.setRequestHeader("username", username);
    //http.setRequestHeader("password", password);
    // Send the two data arrays
    /*if (authenticate == true) {
        http.setRequestHeader("key_down", key_down_time_arr);
        http.setRequestHeader("in_between", in_between_arr);
    }*/
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            // Successful Login
            window.alert("Successfully Logged In");
        } else if (this.readyState == 4) {
            console.log("Failed Login");
        }
    }
    http.send("Test");
}
