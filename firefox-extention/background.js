// background.js

var netSize = 0;
var id = 0;


// Listen for network requests and log data received in the response
browser.webRequest.onCompleted.addListener(
  function(details) {
    var netSize = 0;
    var tabID = 0;
   
    tabID = JSON.stringify(details['tabId'])
    console.log(JSON.stringify(details['tabId']))

    try {
        netSize = parseInt(localStorage.getItem(tabID));
        if(isNaN(netSize))
        {
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
    console.log('LOCAL : ',localStorage.getItem(tabID));


  
  },
  {urls: ["<all_urls>"]},
  ["responseHeaders"]
);

browser.webRequest.onBeforeRequest.addListener(
  function(details) {
    // Update the net size counter with the size of the request
    // netSize -= details.requestBody.raw[0].bytes;

  },
  {urls: ["<all_urls>"]},
  ["requestBody"]
);


  
  browser.tabs.onActivated.addListener(function(activeInfo) {
    console.log("Tab switch detected! Active tab ID:", activeInfo.tabId);
  
    // Get the current tab information
    browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      // The first element of the array is the current tab

      curr_tab = JSON.stringify(tabs[0]["id"])
      netSize = parseInt(localStorage.getItem(curr_tab))
      console.log('current tab and net size (FINAL): ',curr_tab,netSize)

    
  
      // Update the HTML content of the extension
      document.getElementById("net-size").innerHTML = curr_tab +'  ---->  ' +netSize;
    });
  });



  // Listen for tab update events
browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // Check if the tab has reloaded
    if (changeInfo.status === "loading") {
      console.log("Tab reload detected! Tab ID:", tabId);
      curr_tab = JSON.stringify(tabId)
      localStorage.setItem(curr_tab, 0);
    }
  });
  