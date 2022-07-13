console.log("Background running");
// when the button is clicked
chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked() {
  console.log("Button clicked");
  // open a new tab
  chrome.tabs.create({
    url: "https://beiwe.herokuapp.com/extension/login"
  });
}