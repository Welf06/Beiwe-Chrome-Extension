// contains 
//    login/logout logic [done]
//    signup logic [done]
//    sending the labels to the server [done]
const loginButton = document.getElementById("login-button");
const logoutButton = document.getElementById("logout-button");
const signupbutton = document.getElementById("sign-up");
const setlabelbutton = document.getElementById("setlabel");
// API calls
//const email = 'neeraj.yathy@gmail.com';
//const password = '1234';
//const username = "nxpy";
let token = "";
let email = "";
let password = "";
let username = "";

let labels = ["cat", "goat"];

//add an element to the array
function addElement() {
    labels.push(document.getElementById('word').value);
    console.log(labels);
}

function show() {
    var x = document.getElementsByClassName("hi");
    for (var i = 0; i < x.length; i++) {
        x[i].style.display = "block";
    }
}

function hide() {
    var x = document.getElementsByClassName("hi");
    for (var i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
}

loginButton.addEventListener('click', () => {
    email = document.getElementById("mail").value;
    password = document.getElementById("password").value;
    let loginData = {
        "data": {
            "email": email,
            "password": password,
        }
    }
    login(loginData);
});

logoutButton.addEventListener('click', () => {
    let logoutData = {
        "data": {
            "email": email,
            "session_key": token
        }
    }
    logout(logoutData);
});

signupbutton.addEventListener('click', () => {
    username = document.getElementById("username").value;
    email = document.getElementById("mail").value;
    password = document.getElementById("password").value;
    let signupdata = {
        "data": {
            "email": email,
            "name": username,
            "password": password
        }
    }
    signup(signupdata);
});

//something wrong with this button
setlabelbutton.addEventListener('click', () => {
    window.alert("set label button clicked");
    let labelData = {
        "data": {
            "labels": labels,
            "email": email,
            "session_key": token
        }
    }
    setLabel(labelData);
});


// send post HTTP request to https://beiwe.herokuapp.com/extension/login to login
// send get HTTP request to https://beiwe.herokuapp.com/extension/setlabel to set the labels
// send post HTTP request to https://beiwe.herokuapp.com/extension/logout to logout
function login(loginData) {
    chrome.storage.sync.get("login_status", function(obj) {
        let login_data = obj.login_status;
        if (login_data === "Logged in") {
            window.alert("Already logged in");
            return;
        }
        $.ajax({
            type: "POST",
            url: `https://beiwe.herokuapp.com/extension/login?login_data=` + encodeURIComponent(JSON.stringify(loginData)),
            contentType: "application/json",
            success: function(data) {
                data = JSON.parse(data);
                if (data.status === "Logged in") {
                    window.alert("Login sucessfull");
                    const session_key = data.session_key;
                    chrome.storage.sync.set({ "session_key": session_key });
                    console.log(`session key set`);
                    chrome.storage.sync.set({ "login_status": "logged in" });
                    token = session_key;
                    hide();
                    document.getElementById('logout-button').style.display = "block";
                } else if (data.status === "Not logged in") {
                    window.alert("Login unsucessfull");
                }
            }
        });
    });
}

// sending the labels to the server
function setLabel(labelData) {
    window.alert("gota here");
    chrome.storage.sync.get("login_status", function(obj) {
        let login_data = obj.login_status;
        if (login_data === "logged out") {
            window.alert("Please login first");
            return;
        }
        $.ajax({
            type: "POST",
            url: `https://beiwe.herokuapp.com/extension/setlabel?setlabel_data=` + encodeURIComponent(JSON.stringify(labelData)),
            contentType: "application/json",
            success: function(data) {
                console.log(data);
                data = JSON.parse(data);
                if (data.status === "labels updated/inserted") {
                    window.alert("Labels inserted");
                    clearInput();
                } else if (data.status === "Error") {
                    window.alert("Error");
                }
            }
        });
    });
}


//send signup details to the backend in heroku backend receive the conformation from backend
function signup(signupdata) {
    $.ajax({
        type: "POST",
        url: `https://beiwe.herokuapp.com/extension/signup?signup_data=` + encodeURIComponent(JSON.stringify(signupdata)),
        contentType: "application/json",
        success: function(data) {
            console.log(data);
            data = JSON.parse(data);
            window.alert(data.status);
            if (data.status === "User created") {
                console.log(`signed up to beiwe backened`);
                window.alert("signup successful");
            } else if (data.status === "User not created") {
                console.log(`not signed up`);
            }
        }
    });

}

//logout function
function logout(logoutData) {
    chrome.storage.sync.get("login_status", function(obj) {
        let login_data = obj.login_status;
        if (login_data === "logged out") {
            window.alert("Already logged out");
            return;
        }
        $.ajax({
            type: "GET",
            url: `https://beiwe.herokuapp.com/extension/logout?logout_data=` + encodeURIComponent(JSON.stringify(logoutData)),
            success: function(data) {
                console.log(data);
                data = JSON.parse(data);
                if (data.status === "Not logged out") {
                    console.log(`not logged out`);
                } else if (data.status === "logged out") {
                    chrome.storage.sync.set({ "login_status": "logged out" });
                    clearInput();
                    show();
                    document.getElementById('logout-button').style.display = "none";
                    window.alert("logged out");
                }
            }
        });
    });
}
