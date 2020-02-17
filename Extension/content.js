if (document.readyState == "interactive") {
    console.log(document.readyState);
    chrome.runtime.sendMessage("loaded");
}

window.onload = function(tab) {
    chrome.runtime.sendMessage("loaded");
}
