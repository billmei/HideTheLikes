(function(){

var userStorage = chrome.storage.local;
var $traySetting = $("#traySetting");
var $toastSetting = $("#toastSetting");
var $traySaved = $("#traySaved");
var $toastSaved = $("#toastSaved");
var defaultSetting = true;

loadSavedOptions();

$traySetting.on("click",function(){
    saveThis("traySetting",$traySaved);
});

$toastSetting.on("click",function(){
    saveThis("toastSetting",$toastSaved);
});

function showConfirmation (DOMobject) {
    DOMobject.animate({
        opacity: 0.99
    }, 50, function(){
        DOMobject.animate({
            opacity: 0
        }, 1250);
    });
};

// function saveThis (idOfNode, DOMobject) {
//     var checkedOrNot = document.getElementById(idOfNode).checked;
//     storage.set({idOfNode: checkedOrNot}, function(){
//         showConfirmation(DOMobject)
//     });
//     console.log(storage.get(idOfNode,function(){}));
// };

// tracks changes in user storage
chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    var storageChange = changes[key];
    console.log('Storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new value is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
  }
});

function saveThis (idOfNode, DOMobject) {
    var checkedOrNot = document.getElementById(idOfNode).checked;
    chrome.storage.local.set({idOfNode: checkedOrNot}, function(){
        showConfirmation(DOMobject)
    });
    console.log(userStorage.get(idOfNode,function(items){}));
};

function loadSavedOptions () {
    var trayStorage = userStorage.get({"traySetting": true},function(){});
    var toastStorage = userStorage.get({"traySetting": true},function(){});
    // Load defaults if user has not set an option
    console.log(trayStorage);
    if (!trayStorage || !toastStorage) {
        userStorage.set({"traySetting": true}, function(){});
        userStorage.set({"toastSetting": true}, function(){});
        trayStorage = true;
        toastStorage = true;
        console.log("iffed!");
    }
    console.log(trayStorage);
    console.log(userStorage.get("traySetting",function(){}));
    document.getElementById(traySetting).checked = trayStorage;
    document.getElementById(toastSetting).checked = toastStorage;
};

}());