//appending the loading division
let loading_div = document.createElement('div');
loading_div.innerHTML = `<div id="beiwe-loading-div">
<img id="beiwe-loading-image" src="https://i.imgur.com/jFDZGw7.gif" alt="Loading..." />
</div>`
document.body.appendChild(loading_div);

const email = 'neeraj.yathy@gmail.com';
const password = '1234';



// getting the images link 
function getImageLinks(_callgetSessionKey) {
const imageLinks = document.querySelectorAll('img');
let imgArray = [];
for (let i = 0; i < imageLinks.length; i++) {
  if (imageLinks[i].src !== "") {
    imgArray.push(imageLinks[i].src);
  }
}
_callgetSessionKey();
return imgArray;
}

let imgRequestData = {
  "data": {
    "img_urls": getImageLinks(getSessionKey),
    "email": email,
    // "session_key": token,
    // "website": window.location.href
  }
}

// getting the session key for making requests to the backend
function getSessionKey() {
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
  const imgsToBlockArray = imgsToBlock(imgRequestData.data.img_urls, imgRequestData, function (array) {
    blockImages(array, removeLoadingDiv);
    console.log(array);
    });
  // console.log(imgArray); //works 
});
}

// removing the loading once the blocked images are hidden
function removeLoadingDiv() {
  document.body.removeChild(loading_div);
}

// getting the urls to block from the server
function imgsToBlock(array, data, _callback) {
  let toBlock = [];
  chrome.storage.sync.get("login_status", function (obj) {
    let login_data = obj.login_status;
    if (login_data === "logged in") {
      console.log("retrieving urls to block from server");
      $.ajax({
        type: "GET",
        url: `https://beiwe.herokuapp.com/extension/api_call?images=` + encodeURIComponent(JSON.stringify(data)),
        success: function (data) {
          console.log(data);
          data = JSON.parse(data);
          if (data.status === "Image labels not returned") {
            alert(`You are not logged in to Beiwe backend. Please login to Beiwe backend and try again.`);
            // imgsToBlock(array);
          }
          else {
            let blockList = data.blocklist;
            for (let i = 0; i < array.length; i++) {
              for (let j = 0; j < blockList.length; j++) {
                if (array[i] === blockList[j]) {
                  toBlock.push(array[i]);
                }
              }
            }
          }

        }
      });
    }
  });
  _callback(toBlock);
  return toBlock;
}


function blockImages(toBlock, removeLoadingDiv) {
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
  removeLoadingDiv();
}



