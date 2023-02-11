
var data = localStorage.getItem("dataKey1");



if(!(data)){
    console.log('Redirecting .. ')
    window.location.replace("http://www.google.com");
}



localStorage.setItem("dataKey", 'AKSHAY')
var data = localStorage.getItem("dataKey");
window.postMessage({ type: "passData", data: data }, "*");
