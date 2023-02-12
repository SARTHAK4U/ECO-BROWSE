window.addEventListener("message", function (event) {
	if (event.data.type === "passData") {
		browser.runtime.sendMessage({ data: event.data.data });
	}
});
