(function(){

$(document).ready(function(){
// Run it once the first time on page load
if ($('#timeline_tab_content').length > 0) {
    hideTimelineLikes();
} else if ($('#pagelet_home_stream').length > 0) {
    hideNewsFeedLikes();
} else {
    hideTimelineLikes();
};

//Facebook pulls data in via scripts so we need to re-check if the user has navigated to a new page every second.
window.setInterval(function(){
    if ($('#timeline_tab_content').length > 0) {
        hideTimelineLikes();
        pageListener(hideTimelineLikes,'timeline_tab_content');
        pageListener(hideTrayNotifications,'fbNotificationsList');
    } else if ($('#pagelet_home_stream').length > 0) {
        hideNewsFeedLikes();
        pageListener(hideNewsFeedLikes,'pagelet_home_stream');
        pageListener(hideTrayNotifications,'fbNotificationsList');
    } else {
        hideTimelineLikes();
    }
},1000);
});

function pageListener (pageToHide, idOfDOMNode) {
    window.HideTheLikes_lastFunctionRun = new Date();
    window.HideTheLikes_timeRightNow = new Date();
    window.HideTheLikes_diff = new Date(); // number of seconds since the last function call
    var delayInterval = 100;
    // Adds a listener to the stream (timeline or newsfeed) to execute the hiding function whenever there is a new post 
    var stream = document.getElementById(idOfDOMNode);
    stream.addEventListener('DOMNodeInserted',function() {
        window.HideTheLikes_diff.setTime(window.HideTheLikes_timeRightNow.getTime() - window.HideTheLikes_lastFunctionRun.getTime());
        if (window.HideTheLikes_diff.getTime() > delayInterval) {
            pageToHide();
            window.HideTheLikes_lastFunctionRun = new Date();
        }
        window.setTimeout(function(){window.HideTheLikes_timeRightNow = new Date();},delayInterval);
    });
};

function hideTimelineLikes () {
    $('.UFICommentLikeButton').prev().addClass('hider');
    $('.sx_2b72b2').next().addClass('hider');
    $('img[src*="//fbstatic-a.akamaihd.net/rsrc.php/v2/y-/r/lkH9Al5GEhV.gif"]').next().addClass('hider');
    $('.UFIShareIcon').parent().parent().parent().addClass('hider');
};

function hideNewsFeedLikes () {
    $('.UFICommentLikeButton').prev().addClass('hider');
    $('.UFIBlingBoxLikeIcon').parent().addClass('hider');
    $('.UFIBlingBoxReshareIcon').parent().addClass('hider');
    $('.UFIShareLink').closest('.UFIRow').addClass('hider');
};

function hideToastNotifications () {
    // I have to figure out how to change this to discern between notifications
    // for 'likes' and notifications for other things like event invites and comments.
    // Both the like icon as well as the notification toast div uses '._2a9' as its class.
    $('._2a9').addClass('hider');
};

function hideTrayNotifications () {
    // chrome.extension.sendMessage
    console.log($('li.notification').attr('data-gt'));
    // $('.sp_923wwp .sx_c8a87a .sp_45ezie').closest('li.notification').addClass('hider');
};

// {'alert_id':'80201029','app_id':'2409997254','unread':'0','context_id':'419901481432322','from_uids':{'627830964':'627830964'},'notif_type':'like','notif_subtype':'share'}

}());

