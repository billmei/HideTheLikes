(function(){

$(document).bind("DOMSubtreeModified",function(){
    hideLikes();
    console.log("updated!")
});

function hideLikes () {
    $(".UFILikeSentence").remove();
    $(".fbTimelineFeedbackShares").remove();
    $(".fbTimelineFeedbackLikes").remove();
    $(".UFICommentLikeButton").prev().html("");
    $(".UFICommentLikeButton").html("");
    $(".UFIBlingBoxLikeIcon").next().html("");
    $(".UFIBlingBoxLikeIcon").remove();
    $(".UFIBlingBoxReshareIcon")
    $(".UFIShareLink").parents(".UFIRow").remove();

}


}());

