const utils = require('./background.js');//linking the two js files
chrome.runtime.sendMessage(
		{
			action: "updateFootprint",
			footprint: calculateFootprint()
		}
	);
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
	{
		if (request.action === "updateFootprint")
		{
			// Update UI to display calculated footprint
			document.getElementById("footprint").textContent = request.footprint + " g";
		}
		console.log('Hi');
	}
);
