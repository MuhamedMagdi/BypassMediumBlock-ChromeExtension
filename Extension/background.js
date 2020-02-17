console.log("Extension is working");
var isloaded = true;
current = 1;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        var url = tab.url;
        if (url.includes('https://medium.com/') && isloaded && current % 2 == 0) {
            console.log(url);
            chrome.tabs.remove(tabs[0].id);
            window.open(url.replace(".com/", ".com./"), '_blank');
            isloaded = false;
        }
    });
});
chrome.runtime.onMessage.addListener(loaded);

function loaded(load, sender, sendResponse) {
    console.log(load);
    isloaded = true;
}

function updateIcon() {
    chrome.storage.sync.get('number', function(data) {
        chrome.browserAction.setIcon({
            path: 'icon' + current + '.png'
        });
        current++;
        if (current > 2)
            current = 1;
        chrome.storage.sync.set({
            number: current
        })
    });
};

chrome.browserAction.onClicked.addListener(updateIcon);
updateIcon();

chrome.browserAction.onClicked.addListener(disableORenable);

function disableORenable() {
    console.log('is Extension working = ' + (!!(current % 2)));
}