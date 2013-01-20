(function(){

window.setInterval(
    function() {
        hideLikes();
},1000);

function hideLikes () {
    $(".UFILikeSentence").remove();
    $(".fbTimelineFeedbackShares").remove();
    $(".fbTimelineFeedbackLikes").remove();
    $(".UFICommentLikeButton").prev().html("");
    $(".UFICommentLikeButton").html("");
    $(".UFIBlingBoxLikeIcon").next().html("");
    $(".UFIBlingBoxLikeIcon").remove();
}


})();