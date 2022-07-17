//appending the loading division
let loading_div = document.createElement('div');
loading_div.id = "beiwe-loading-div-parent";
loading_div.innerHTML = `<div id="beiwe-loading-div">
<img id="beiwe-loading-image" src="https://i.imgur.com/jFDZGw7.gif" alt="Loading..." />
</div>`
document.body.appendChild(loading_div);

const email = 'neeraj.yathy@gmail.com';
const password = '1234';


// console.log(getImageLinks(getSessionKey));
let imgRequestData = {
  "data": {
    "img_urls": getImageLinks(getSessionKey, removeLoadingDiv),
    "email": email,
    // "session_key": token,
    // "website": window.location.href
  }
};

// getting the images link 
function getImageLinks(_callgetSessionKey, removeLoadingDiv) {
const imageLinks = document.querySelectorAll('img');
let imgArray = [];
for (let i = 0; i < imageLinks.length; i++) {
  if (imageLinks[i].src !== "") {
    imgArray.push(imageLinks[i].src);
  }
}
console.log(imageLinks)
console.log(`getImageLinks works`)
if (imageLinks.length===1) {
  removeLoadingDiv();
}
else {
  _callgetSessionKey(imageLinks);
}
return imgArray;
}

// getting the session key for making requests to the backend
function getSessionKey(imageLinks) {
let token = "";
chrome.storage.sync.get("session_key", (obj) => {
  let session_key = obj.session_key;
  if (session_key === undefined) {
    session_key = "";
  }
  // console.log(`got session key {${session_key}}`); //works
  token = session_key;
  imgRequestData.data.session_key = token;
  imgRequestData.data.website = window.location.href;
  // console.log(imgRequestData); //works
  console.log(`getSessionKey works`);
  imgsToBlock(imgRequestData.data.img_urls, imgRequestData, function (array) {
    blockImages(array, imageLinks, removeLoadingDiv);
    console.log(array);
    });
  // console.log(imgArray); //works 
});
}

// getting the urls to block from the server
function imgsToBlock(array, data, _callback) {
  let toBlock = [];
  chrome.storage.sync.get("login_status", function (obj) {
    let login_data = obj.login_status;
    if (login_data === "logged in") {
      console.log(`imgsToBlock works`);
      console.log("retrieving urls to block from server");
      $.ajax({
        type: "GET",
        url: `https://beiwe.herokuapp.com/extension/api_call?images=` + encodeURIComponent(JSON.stringify(data)),
        success: function (data) {
          console.log(data);
          data = JSON.parse(data);
          if (data.status === "Image labels not returned") {
            alert(`You are not logged in to Beiwe backend. Please login to Beiwe backend and try again.`);
            removeLoadingDiv();
            // imgsToBlock(array);
          }
          else {
            let blockList = data.blocked_images;
            for (let i = 0; i < array.length; i++) {
              for (let j = 0; j < blockList.length; j++) {
                if (array[i] === blockList[j]) {
                  toBlock.push(array[i]);
                }
              }
            }
            // console.log(toBlock.toString());
            console.log(toBlock);
            _callback(toBlock);
            return toBlock;
          }
        }
      });
    }
  });
  
}

// removing the loading once the blocked images are hidden
function removeLoadingDiv() {
  document.querySelector('#beiwe-loading-div-parent').remove();
  console.log(`removed loading div`);
}

function blockImages(toBlock, imageLinks, removeLoadingDiv) {
  // console.log(toBlock.toString());
  // console.log(toBlock[0]);
  for (const img_link of toBlock) {
    // console.log(img_link);
    for (const page_img of imageLinks){
      console.log(page_img);
      if (img_link === page_img.src){
        page_img.style.display = "none";
      }
    }
  removeLoadingDiv();
}
}



