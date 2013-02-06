(function(){


$(document).ready(function(){
// Run it once the first time on page load
    if ($("#timeline_tab_content").length > 0) {
        hideTimelineLikes();
    } else if ($("#pagelet_home_stream").length > 0) {
        hideNewsFeedLikes();
    } else {
        hideTimelineLikes();
    }

//Facebook pulls data in via scripts so we need to re-check if the user has navigated to a new page every second.
window.setInterval(function(){
    if ($("#timeline_tab_content").length > 0) {
        hideTimelineLikes();
        pageListener(hideTimelineLikes,'timeline_tab_content');
    } else if ($("#pagelet_home_stream").length > 0) {
        hideNewsFeedLikes();
        pageListener(hideNewsFeedLikes,'pagelet_home_stream');
    } else {
        hideTimelineLikes();
    }
},1000);
});

function pageListener (pageToHide, idOfDOMNode) {
    window.HideTheLikes_lastFunctionRun = new Date();
    window.HideTheLikes_timeRightNow = new Date();
    window.HideTheLikes_diff = new Date();
    var delayInterval = 100;
    // Adds a listener to the timeline to execute the hiding function whenever there is a new post 
    var timeline = document.getElementById(idOfDOMNode)
    timeline.addEventListener("DOMNodeInserted",function() {
        window.HideTheLikes_diff.setTime(window.HideTheLikes_timeRightNow.getTime() - window.HideTheLikes_lastFunctionRun.getTime());
        if (window.HideTheLikes_diff.getTime() > delayInterval) {
            pageToHide();
            window.HideTheLikes_lastFunctionRun = new Date();
            // console.log(window.HideTheLikes_diff.getTime()); // Use for debugging: logs the number of seconds since the last function call
        }
        window.setTimeout(function(){window.HideTheLikes_timeRightNow = new Date();},delayInterval);
               
})
};

function hideTimelineLikes () {
    $(".UFILikeSentence").remove();
    $(".UFICommentLikeButton").prev().html("");
    $(".UFICommentLikeButton").html("");
    $(".fbTimelineFeedbackShares").remove();
    $(".fbTimelineFeedbackLikes").remove();
    // console.log("timeline updated!"); // Use for debugging
    return;
}

function hideNewsFeedLikes () {
    $(".UFILikeSentence").remove();
    $(".UFICommentLikeButton").prev().html("");
    $(".UFICommentLikeButton").html("");
    $(".UFIBlingBoxLikeIcon").parent().remove();
    $(".UFIBlingBoxReshareIcon").parent().remove();
    $(".UFIShareLink").parents(".UFIRow").remove();
    // console.log("news feed updated!"); // Use for debugging
    return;
};


}());

