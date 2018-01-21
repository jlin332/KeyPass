// Store key character pressed
var character_arr = [];
// Store time when key is pressed down
var keyDown_arr = [];
// Store time when key is released
var keyUp_arr = [];
// Keyboard pressed down time - computed from KeyUp[i] - KeyDown[i]
var key_down_time_arr = [];
// In-between time keyboard press - can be negative if type fast
var in_between_arr = [];
var dictionary = [];

var authenticate = false;
var is_user = 0;
var training = false;

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

var training_toggle = document.getElementById("training");
training_toggle.addEventListener('change', function() {
    if (this.checked) {
        training = true;
        console.log("Training");
    } else {
        training = false;
        console.log("Stop Training");
    }
});

var user_toggle = document.getElementById("is_user");
user_toggle.addEventListener('change', function() {
    if (this.checked) {
        is_user = 1;
    } else {
        is_user = 0;
    }
});

var appendToKeyDown = function(e) {
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90)) {
        var down_date = new Date();
        var timeStamp = down_date.getTime();
        keyDown_arr.push(timeStamp);
        var character_pressed = String.fromCharCode(e.keyCode);
        character_arr.push(character_pressed);
    }
}

var appendToKeyUp = function(e) {
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90)) {
        var up_date = new Date();
        var timeStamp = up_date.getTime();
        keyUp_arr.push(timeStamp);
    }
}

function login_action() {
    // Handle Post request
    console.log("Login_action_pressed");
    var username = document.getElementById('user_id').value;
    var password = document.getElementById('password').value;
    compute_key_down_time();
    //console.log(key_down_time_arr);
    console.log(in_between_arr);
    //console.log(dictionary);
    if (!training) {
        post_request(username, password);
    } else {
        training_request();
    }
    reset();
    document.getElementById("password").value = "";
}

function compute_key_down_time() {
    for (i = 0; i < keyUp_arr.length; i++)  {
        key_down_time_arr[i] = keyUp_arr[i] - keyDown_arr[i];
        dictionary.push([character_arr[i], key_down_time_arr[i]]);
    }
    for (t = 1; t < keyDown_arr.length; t++) {
        in_between_arr[t-1] = keyDown_arr[t] - keyUp_arr[t-1];
    }
}

function reset() {
    dictionary = [];
    character_arr = [];
    in_between_arr = [];
    keyDown_arr = [];
    key_down_time_arr = [];
    keyUp_arr = [];
}

function training_request() {
    var http = new XMLHttpRequest();
    console.log("start Training POST request");
    http.open("POST", "/train", true);
    http.setRequestHeader("Content-type", "application/json");
    // Send the two data arrays
    if (authenticate == true) {
        http.setRequestHeader("key_pressed", dictionary);
        http.setRequestHeader("in_between", in_between_arr);
    }
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.alert("Training Successful");
        } else if (this.readyState == 4) {
            console.log("Failed Training");
        }
        reset();
        document.getElementById("password").value = "";
    }
    http.send(JSON.stringify({user: is_user })); //Send 1 if is user
}

function post_request(username, password) {
    // Post to the Node server endpoint
    var http = new XMLHttpRequest();
    console.log("start POST request");
    http.open("POST", "/login", true);
    http.setRequestHeader("Content-type", "application/json");
    // Send the Password and Username for first level authentication
    // Send the two data arrays
    if (authenticate == true) {
        //console.log("sent data");
        http.setRequestHeader("key_pressed", dictionary);
        http.setRequestHeader("in_between", in_between_arr);
    }
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Successful Login
            window.alert("Successfully Logged In " + this.responseText);
        } else if (this.readyState == 4) {
            console.log("Failed Login");
        }
    }
    http.send(JSON.stringify({user: is_user })); //Send 1 if is user
}
