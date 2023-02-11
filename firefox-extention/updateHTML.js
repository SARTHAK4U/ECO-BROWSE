
browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    // The first element of the array is the current tab

    curr_tab = JSON.stringify(tabs[0]["id"])
    netSize = parseInt(localStorage.getItem(curr_tab))
    console.log('current tab and net size (FINAL): ',curr_tab,netSize)

  

    // Update the HTML content of the extension
    document.getElementById("net-size").innerHTML = curr_tab +'  ---->  ' +netSize;
  });



 
  