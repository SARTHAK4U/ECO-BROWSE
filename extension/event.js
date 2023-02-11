//chrome.action.disable();

// Initialize variables for tracking data sent and received
var dataSent = 0;
var dataReceived = 0;

// Function to update data sent and received
function updateData(requestDetails) {
  dataSent += requestDetails.requestBody.raw[0].bytesSent;
  dataReceived += requestDetails.responseHeaders.get("Content-Length");
  console.log(dataSent);
  console.log(dataReceived);
}

//Add listener to monitor network requests
chrome.webRequest.onSendHeaders.addListener(
  updateData,
  {urls: ["<all_urls>"]},
  ["requestBody"]
);
chrome.webRequest.onHeadersReceived.addListener(
  updateData,
  {urls: ["<all_urls>"]},
  ["responseHeaders"]
);

// Calculate carbon footprint based on data sent and received
function calculateFootprint() {
  // Example calculation: 1 GB of data transfer = 11 g of CO2 emissions
  var footprint = (dataSent + dataReceived) / 1000000000 * 11;
  return footprint;
}

// Send calculated footprint to popup.js
chrome.runtime.sendMessage({
  action: "updateFootprint",
  footprint: calculateFootprint()
});


//yahan se thik hai bas 2-3 lines beech me badli hai dekh lena
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == 'complete'){
      console.log(tab.url);
        console.log('BETE MAUJ KARDI');
        chrome.action.disable(tabId);
        var dt = new Date();
        console.log(dt.toLocaleString());
        // var extensionorigin=chrome.runtime.getURL("");
        // console.log(extensionorigin);
    }
  });
  
  //gemdkhkmcnifpfbfnhpbbhageflibppm


// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status == 'complete'){
//       console.log(tab.url);
//       console.log('BETE MAUJ KARDI');
//       chrome.action.disable(tabId);
// var extensionorigin=chrome.runtime.getURL("");
// console.log(extensionorigin);
// document.getElementById("cv").textContent = extensionorigin;
//     }});