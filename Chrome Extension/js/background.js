// Moves the icon from the toolbar to the statusbar, and displays only when the user is on a Facebook tab
chrome.tabs.onUpdated.addListener(function(id, info) {
    var fbre = /facebook/;
    if (fbre.test(info.url)) {
        chrome.pageAction.show(id);
    }
});

var traySetting;
var toastSetting;

pullFromLocalData();

// // Check to see if local storage values have been initialized, if not, then set to default values.
if (typeof traySetting === "undefined" || typeof toastSetting === "undefined"){
    localStorage.setItem("traySetting", true);
    localStorage.setItem("toastSetting", true);
    pullFromLocalData();
} else {
    pullFromLocalData();
}

function pullFromLocalData() {
    traySetting = localStorage.getItem("traySetting");
    toastSetting = localStorage.getItem("toastSetting");
};

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.setting === true) {
        sendResponse({checkState: "true"});
        switch (request.node) {
            case "traySetting": localStorage.setItem("traySetting", true); break;
            case "toastSetting": localStorage.setItem("toastSetting", true); break;
        }
    } else if (request.setting === false) {
        sendResponse({checkState: "false"});
        switch (request.node) {
            case "traySetting": localStorage.setItem("traySetting", false); break;
            case "toastSetting": localStorage.setItem("toastSetting", false); break;
        }
    } else if  (request.setting === "ping" && request.node === "traySetting") {
        pullFromLocalData();
        sendResponse({checkState: traySetting});
    } else if  (request.setting === "ping" && request.node === "toastSetting") {
        pullFromLocalData();
        sendResponse({checkState: toastSetting});
    } else {
        sendResponse({checkState: "error"});
    }
});