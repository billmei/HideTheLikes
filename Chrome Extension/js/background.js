// Moves the icon from the toolbar to the statusbar, and displays only when the user is on a Facebook tab
chrome.tabs.onUpdated.addListener(function(id, info) {
    var fbre = /facebook/;
    if (fbre.test(info.url)) {
        chrome.pageAction.show(id);
    }
});
