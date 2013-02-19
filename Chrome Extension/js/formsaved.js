(function(){

var $traySetting = $("#traySetting");
var $toastSetting = $("#toastSetting");
var $traySaved = $("#traySaved");
var $toastSaved = $("#toastSaved");

// Loads the user's previous settings
chrome.extension.sendMessage({setting: "ping", node: "traySetting"}, function(response){
    if (response.checkState) {
        document.getElementById("traySetting").checked = true;
    } else if (!response.checkState) {
        document.getElementById("traySetting").checked = false;
    } else {
        console.log("Failed to load default option for Tray Settings");
    }
});

// Ditto.
chrome.extension.sendMessage({setting: "ping", node: "toastSetting"}, function(response){
    if (response.checkState) {
        document.getElementById("toastSetting").checked = true;
    } else if (!response.checkState) {
        document.getElementById("toastSetting").checked = false;
    } else {
        console.log("Failed to load default option for Toast Settings");
    }
});

// Click listener to activate saving function
$traySetting.on("click",function(){
    saveThis("tray", "traySetting", $traySaved);
});

$toastSetting.on("click",function(){
    saveThis("toast", "toastSetting", $toastSaved);
});

// Creates a green UI popup after the user checks a checkbox
function showConfirmation (DOMobject) {
    DOMobject.animate({
        opacity: 0.99
    }, 50, function(){
        DOMobject.animate({
            opacity: 0
        }, 1250);
    });
};

function saveThis (optionName, idOfNode, DOMobject) {
    var checkedOrNot = document.getElementById(idOfNode).checked;
    // Pass the settings over to the background page
    chrome.extension.sendMessage({setting: checkedOrNot, node: idOfNode}, function(response){
        if (response.checkState === "true" || response.checkState === "false") {
            showConfirmation(DOMobject);
        } else {
            showConfirmation($("#" + optionName + "Error"));
        }
    });
};



}());