// contains 
//    login/logout logic [done]
//    sending the labels to the server [done]
//    updating labels 
//    deleting labels
const loginButton = document.querySelector("#login-button");
const logoutButton = document.querySelector("#logout-button");
const setLabelButton = document.querySelector("#setlabel-button");
chrome.storage.sync.set({"login_status" : "logged out" });

// API calls
const email = 'neeraj.yathy@gmail.com';
const password = '1234';
let token = "";
chrome.storage.sync.get("session_key", (obj) => {
   let session_key = obj.session_key;
   if (session_key === undefined) {
      session_key = "";
      }
   token = session_key;
});

loginData = {
  "data": {
    "email": email,
    "password": password,
    "returnSecureToken" : "true"
  }
}

logoutData = {
  "data": {
    "email": email,
    "session_key": token
  }
}

const labels = ['covid-19', 'coronavirus', 'car', 'clown', 'cross', 'class'];
const labelData = {
"data": {
   "labels": labels,
   "email": email,
   "session_key": token
}
}

loginButton.addEventListener("click", () => {
   console.log(`clicked login button`);
   login(loginData);
   });

logoutButton.addEventListener("click", () => {
   console.log(`clicked logout button`);
   logout(logoutData);
   });

setLabelButton.addEventListener("click", () => {
   console.log(`clicked set label button`);
   setLabel(labelData);
   });

// send post HTTP request to https://beiwe.herokuapp.com/extension/login to login
function login(loginData) {
   chrome.storage.sync.get("login_status", function (obj) {
      let login_data = obj.login_status;
      if (login_data === "logged out") {
         $.ajax({
            type: "POST",
            url: `https://beiwe.herokuapp.com/extension/login?login_data=` + encodeURIComponent(JSON.stringify(loginData)),
            // contentType: "application/json",
            success: function(data) {
               data = JSON.parse(data);
               if (data.status === "Logged in"){
               console.log(`logged in to beiwe backened`)
               const session_key = data.session_key;
               chrome.storage.sync.set({ "session_key": session_key }); 
               console.log(`session key set`);
               chrome.storage.sync.set({"login_status" : "logged in" });
               token = session_key;
               labelData.data.session_key = session_key;
               logoutData.data.session_key = session_key;
               }
              else if (data.status === "Not logged in"){
                  console.log(`not logged in`);
               }
            }
          });
         }
         else if (login_data == "logged in") {
          console.log(`already logged in to beiwe backend`);
         }
  });
}

// sending the labels to the server
function setLabel(labelData) {
   chrome.storage.sync.get("login_status", function (obj) {
      let login_data = obj.login_status;
      if (login_data === "logged in") {
         $.ajax({
         type: "GET",
         url: `https://beiwe.herokuapp.com/extension/setlabel?labels=` + encodeURIComponent(JSON.stringify(labelData)),
         data: JSON.stringify(labelData),
         contentType: "application/json",
         success: function(data) {
            console.log(data);
            data = JSON.parse(data);
            if (data.status === "user not logged in"){
               // login(loginData);
               // setLabel(labelData);
            }
            else if (data.status === "labels updated/inserted"){
               console.log(`labels set`);
               }
         }
         });
   }
   else if (login_data == "logged out") {
      console.log(`not logged in to beiwe backend`);
   }
});
}

function logout(logoutData) {
   chrome.storage.sync.get("login_status", function (obj) {
      let login_data = obj.login_status;
      if (login_data === "logged in") {
         $.ajax({
            type: "GET",
            url: `https://beiwe.herokuapp.com/extension/logout?logout_data=`+ encodeURIComponent(JSON.stringify(logoutData)),
            success: function(data) {
               console.log(data);
               data = JSON.parse(data);
               if (data.status === "Not logged out"){
                  console.log(`not logged out`);
               }
               else if (data.status === "logged out"){
                  chrome.storage.sync.set({"login_status" : "logged out" });
               }
            }
            });
         }
      else if (login_data == "logged out") {
         console.log(`already logged out from beiwe backend`);
      }
});
}