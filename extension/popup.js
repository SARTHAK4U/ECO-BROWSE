// Receive message from background.js with calculated footprint
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action === "updateFootprint") {
	  // Update UI to display calculated footprint
	  document.getElementById("footprint").textContent = request.footprint + " g";
	}
  });