/* 
Front End
> Keep the page from loading until API does its work
1. take inputs from user to block the content => store it an array [latter keep it in local storage or make a request to backend to get the labels
]
2. Get all images URL in the website and store it in an array
3. send the img array to the backend to block the images along with the labels
4. get back an array containing array of image urls to block 
5. blur/remove the images
> Load the website and see the images blocked
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