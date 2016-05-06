


$(function() {
        console.log('LOADING');
   var API_KEY = 'AIzaSyD6SFfRsoobeewEdAaCOuotB3pZfaZhMsY';
   var PLAYLIST_ID = 'UUFKDEp9si4RmHFWJW1vYsMA';
   var channel_ID = 'UCFKDEp9si4RmHFWJW1vYsMA';
   var upload_ID = 'UUFKDEp9si4RmHFWJW1vYsMA';
   //PLDvUaV28ulciewonYGknOdIw8lAJfXIzn

   var GOOGLE_API_URL = 'https://www.googleapis.com/youtube/v3/playlistItems?part=id%2C+snippet%2C+contentDetails&playlistId='+PLAYLIST_ID+ '&key=' + API_KEY + '&callback=showVideos';

   $.ajax({
    url: GOOGLE_API_URL,
    dataType: 'jsonp',
    crossDomain: true
   });

   window.showVideos = function(data) {
    if (data.items && data.items.length > 0) {
       $("#video").html('<iframe width="504" height="283" src="http://www.youtube.com/embed/'+data.items[0].contentDetails.videoId+'" frameborder="0" allowfullscreen></iframe>');
       $("#title").html(data.items[0].snippet.title);
       $("#youtubeSection").css('display', 'flex');

       var timer = setInterval(function () {
                    $('#html').css('overflow-y', 'scroll');
                    clearInterval(timer)   }, 20);
            }
    };
});

function allowScroll() {

}

/*
$(function() {

    var $sidebar   = $("#body"),
        $window    = $(window),
        offset     = $sidebar.offset(),
        topPadding = 15;

    $window.scroll(function() {
        if ($window.scrollTop() > offset.top) {
            $sidebar.stop().animate({
                marginTop: $window.scrollTop() - offset.top + topPadding
            });
        } else {
            $sidebar.stop().animate({
                marginTop: 0
            });
        }
    });

});
*/
