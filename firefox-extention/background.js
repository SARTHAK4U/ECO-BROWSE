// background.js

var netSize = 0;
var id = 0;


// Listen for network requests and log data received in the response
browser.webRequest.onCompleted.addListener(
	function (details) {
		var netSize = 0;
		var tabID = 0;

		tabID = JSON.stringify(details['tabId'])
		console.log(JSON.stringify(details['tabId']))

		try {
			netSize = parseInt(localStorage.getItem(tabID));
			if (isNaN(netSize)) {
				netSize = 0
			}

		} catch (error) {
			netSize = 0;
			console.log('no prior value')
		}




		// Update the net size counter with the size of the response
		netSize += details['responseSize'];
		netSize += details['requestSize']


		console.log("The net size of  request is: " + netSize + " bytes");
		localStorage.setItem(tabID, netSize);
		localStorage.setItem(tabID + '_CO2e', (netSize * 11) / 1000000000);
		console.log('LOCAL : ', localStorage.getItem(tabID));



	},
	{ urls: ["<all_urls>"] },
	["responseHeaders"]
);

browser.webRequest.onBeforeRequest.addListener(
	function (details) {
		// Update the net size counter with the size of the request
		// netSize -= details.requestBody.raw[0].bytes;

	},
	{ urls: ["<all_urls>"] },
	["requestBody"]
);



browser.tabs.onActivated.addListener(function (activeInfo) {
	console.log("Tab switch detected! Active tab ID:", activeInfo.tabId);

	// Get the current tab information
	browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		// The first element of the array is the current tab

		curr_tab = JSON.stringify(tabs[0]["id"])
		netSize = parseInt(localStorage.getItem(curr_tab))
		// console.log('current tab and net size (FINAL): ', curr_tab, netSize)



		// Update the HTML content of the extension
		// document.getElementById("user-id").innerHTML = curr_tab + '  ---->  ' + netSize;
	});
});



// Listen for tab update events
browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	// Check if the tab has reloaded
	if (changeInfo.status === "loading") {
		console.log("Tab reload detected! Tab ID:", tabId);
		curr_tab = JSON.stringify(tabId)
		localStorage.setItem(curr_tab, 0);
		localStorage.setItem(curr_tab + '_CO2e', 0);
	}
	if (changeInfo.status === "complete") {
		const userId = localStorage.getItem('EcoBrowse-Id');
		const bytes = localStorage.getItem(curr_tab);
		const CO2e = (bytes * 11) / 1000000000;
		const url = tab.url;
		const timeStamp = tab.lastAccessed;
		// Convert TimeStamp in milliseconds to Date and Time
		const date = new Date(timeStamp);
		const date_time = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
		console.log(userId, bytes, CO2e, url, date_time);

		if (userId) {
			// document.getElementById("user-id").innerHTML = "Id : " + userId;
			const data = new FormData();
			data.append('user_id', userId);
			const session_data = { "Emission": CO2e, "Path": url, "Packets_Lost": 0, "Time": date_time }
			data.append('session_data', JSON.stringify(session_data));

			fetch("http://10.53.114.47:5000/add_session_data", {
				method: 'POST',
				body: data
			})
				.then(data => console.log(data))
				.catch(error => console.log(error));
		}

	}
});


browser.runtime.onMessage.addListener(function (request) {
	var data = request.data;
	console.log('data from message passing : ', data)
	localStorage.setItem('EcoBrowse-Id', data);
	// Do something with the data from the local storage
});
