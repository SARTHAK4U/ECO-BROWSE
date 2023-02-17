const getEmissionRating = (emission) => {
	if (emission < 0.1) {
		return "Green"
	} else if (emission < 0.5) {
		return "Semi-Green"
	} else {
		return "Non-Green"
	}
}

browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	// The first element of the array is the current tab

	curr_tab = JSON.stringify(tabs[0]["id"])
	netSize = parseInt(localStorage.getItem(curr_tab))
	console.log('current tab and net size (FINAL): ', curr_tab, netSize)

	const userId = localStorage.getItem('EcoBrowse-Id');
	const bytes = localStorage.getItem(curr_tab);
	const CO2e = localStorage.getItem(curr_tab + '_CO2e');
	console.log("AJ " + bytes + " " + CO2e)
	// const CO2e = (bytes * 11) / 1000000;

	// Update the HTML content of the extension
	if (userId) document.getElementById("user-id").innerHTML = "Id : " + userId;
	document.getElementById("bytes").innerHTML = "Data In Bytes : " + bytes + ' bytes';
	document.getElementById("emission").innerHTML = "CO2 Emission : " + CO2e + ' g';
	document.getElementById("emission_rating").innerHTML = "Emission Rating : " + getEmissionRating(CO2e);
});




