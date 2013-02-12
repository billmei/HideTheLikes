chrome.tabs.onUpdated.addListener(function(id, info) {
    var fbre = /facebook/;
    if (fbre.test(info.url)) {
        chrome.pageAction.show(id);
    }
});
