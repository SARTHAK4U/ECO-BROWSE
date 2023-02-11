//chrome.action.disable();
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == 'complete'){
      console.log(tab.url);
        console.log('BETE MAUJ KARDI');
        chrome.action.disable(tabId);
  
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