// background.js

// Initialize variables for tracking data sent and received
var dataSent = 0;
var dataReceived = 0;

// Function to update data sent and received
function updateData(requestDetails) {
  dataSent += requestDetails.requestBody.raw[0].bytesSent;
  dataReceived += requestDetails.responseHeaders.get("Content-Length");
}

// Add listener to monitor network requests
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
  updateData();
  // Example calculation: 1 GB of data transfer = 11 g of CO2 emissions
  var footprint = (dataSent + dataReceived) / 1000000000 * 11;
  return footprint;
}

// // Send calculated footprint to popup.js
// chrome.runtime.sendMessage({
//   action: "updateFootprint",
//   footprint: calculateFootprint()
// });

// // popup.js

// // Receive message from background.js with calculated footprint
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.action === "updateFootprint") {
//     // Update UI to display calculated footprint
//     document.getElementById("footprint").textContent = request.footprint + " g";
//   }
// });