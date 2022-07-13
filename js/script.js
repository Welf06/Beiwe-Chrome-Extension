/* 
------------Front End---------------

-> working of extension:
    > Keep the page from loading until API does its work
    > fetch labels from server and check if the login session is active or not
      > if not active then login and get the labels
      > login => storing the email and password in local storage or letting the user input it  each time
    > Get all images URL in the website and store it in an array
    > send the img array to the backend to block the images along with the labels
    > get back an array containing array of image urls to block 
    > blur/remove the images
    > displavy the website

-> features:
    > Turning the extension on or off for the particular site or whole browser
    > Login to the extension to maintain session to make API calls
    > Setting, updating and Deleting the Labels
    > An About page which takes user to the website of the extension

-> Issues/edge cases:
    > Handling infinite scroll in the website like reddit or google images
    
*/

// loading division
let loading_div = document.createElement('div');
loading_div.innerHTML = `<div id="beiwe-loading-div">
<img id="beiwe-loading-image" src="https://i.imgur.com/jFDZGw7.gif" alt="Loading..." />
</div>`
document.body.appendChild(loading_div);

// removing the loading once the images are replaced with the blocked images
$(window).on('load', function () {
   $('#beiwe-loading-div').hide();
 }) 

// getting the images link 
const imageLinks = document.querySelectorAll('img');
let imgArray = [];
for (let i=0; i < imageLinks.length; i++) {
    if (imageLinks[i].src !== "") {
        imgArray.push(imageLinks[i].src);
    }
}

// getting the urls to block from the server
// if not logged in then login and get the urls
function imgsToBlock(array){
  return array;
}

// for now just checking each img to find if it matches the url
const toBlock = imgsToBlock(imgArray);

toBlock.forEach(
    function (img) {
      imageLinks.forEach(
        function (imgLink) {
          if (imgLink.src === img) {
            imgLink.style.display = "none";
          }
        }
      )
    }
);

const email = 'neeraj.yathy@gmail.com';
const password = '1234';

loginData = {
  "data": {
    "email": email,
    "password": password
  }
}

// send post HTTP request to https://beiwe.herokuapp.com/extension/login to login
$.ajax({
  type: "POST",
  url: `https://beiwe.herokuapp.com/extension/login?login_data=` + encodeURIComponent(JSON.stringify(loginData)),
  // contentType: "application/json",
  success: function(data) {
    setLabel();
    console.log(data);
  }
});

// setting the labels
const labels = ['covid-19', 'coronavirus', 'car', 'clown', 'cross'];
const labelData = {
  "data": {
    "labels": labels
}
}

// sending the labels to the server
function setLabel() {
$.ajax({
  type: "POST",
  url: `https://beiwe.herokuapp.com/extension/setlabel?labels=` + encodeURIComponent(JSON.stringify(labelData)),
  data: JSON.stringify(labelData),
  contentType: "application/json",
  success: function(data) {
    console.log(data);
  }
});
}
// const setLabelURL =  `https://beiwe.herokuapp.com/extension/setlabel?labels=` + encodeURIComponent(JSON.stringify(labelData));
// fetch(setLabelURL)
// .then(response => response)
// .then(data => console.log(data))
/*
{
    "labels": [],
    "params": [
        "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
    ]
} 
*/