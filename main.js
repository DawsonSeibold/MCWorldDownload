var origanalMarginTop = 0;
var hideFooter = false
var myCookie = false

$(function() {

        var cookie = document.cookie;
         if (cookie.indexOf("yes") > -1)  {
                 myCookie = true
                 $('#olderDownloads').css('display', 'block');
                 $('#showOldDownloads').css('display', 'none');
                 $('#mainText').css('margin-top', '5px');
        }else {
                 myCookie = false
        }

        origanalMarginTop = $('#mainText').css("margin-top").replace("px", "");
        console.log("Height: "+ document.getElementById("mainText").offsetHeight );
        var oldDiv = $('#olderDownloads');
        $('#showOldDownloads').bind('click', function() {

                moveUp();
                expand();
                //$('#olderDownloads').fadeToggle('slow');

        });

        $('#closeTap').bind('click', function() {

                myMove();
                moveDown();
                oldDiv.animateCss('fadeOutDownBig');
                //oldDiv.fadeOut('slow');

        });
});

function openMenu() {
        $('#olderDownloads').css('display', 'block');
        $('#showOldDownloads').css('display', 'none');
        $('#mainText').css('margin-top', '5px');


        console.log("test: "+ $('#html').css('height').replace("px", "") );
        if ($('#html').css('height').replace("px", "") <= 850) {
                $('#footer').fadeToggle();
                $('#footer').css('display', 'none');
                hideFooter = true;
        }
        document.cookie = "menuOpen=yes";
}

function closeMenu() {
        $('#olderDownloads').css('display', 'none');
        $('#showOldDownloads').css('display', 'inline-block');
        $('#mainText').css('margin-top', 'calc(100%  / 2)');
        $('#mainText').css('height', 'auto');

        if (hideFooter == true) {
                $('#footer').css('display', 'flex');
                hideFooter = false;
        }
        document.cookie = "menuOpen=no";
}

function myMove() {
  var elem = document.getElementById("mainText");
  var currentHeight = elem.offsetHeight ;
  console.log("tHeight: "+ currentHeight);

  var id = setInterval(frame, 0.3);
  function frame() {
    if (currentHeight <= 232) {
      clearInterval(id);
      closeMenu();
    } else {
      currentHeight = currentHeight - 4;
      elem.style.height = currentHeight + 'px';
      // $('#olderDownloads').style.height = currentHeight + 'px';
    }
  }
}

function moveDown() {
  var elem = document.getElementById("mainText");
  var newHeight = Math.floor(origanalMarginTop);
  var currentPosition = $('#mainText').css("margin-top").replace("px", "");
  console.log("To Height: "+ origanalMarginTop + ", Starting point: " + currentPosition);
  var id = setInterval(frame, 10);
  function frame() {
    if (currentPosition >= newHeight) {
        //    console.log("called");
      clearInterval(id);
    } else {

      currentPosition = parseInt(currentPosition) +6;
       //console.log("called, "+ currentPosition + ", new: " + newHeight);
      elem.style.marginTop = currentPosition + 'px';
    }
  }
}

function moveUp() {
  var elem = document.getElementById("mainText");
  var newHeight = 5
  var currentPosition = Math.floor($('#mainText').css("margin-top").replace("px", ""));
  console.log("To Height: "+ newHeight + ", Starting point: " + currentPosition);
  var id = setInterval(frame, 10);
  function frame() {
    if (currentPosition <= newHeight) {
        //    console.log("called");
      clearInterval(id);
      openMenu();
    } else {

      currentPosition = parseInt(currentPosition) - 6;
       //console.log("called, "+ currentPosition + ", new: " + newHeight);
      elem.style.marginTop = currentPosition + 'px';
    }
  }
}

function expand() {
        var elem = document.getElementById("mainText");
        var currentHeight = elem.offsetHeight ;
        console.log("tHeight: "+ currentHeight);

        var id = setInterval(frame, 0.1);
        function frame() {
          if (currentHeight >= 818) {
            clearInterval(id);
          } else {
            currentHeight = parseInt(currentHeight) + 3;
            elem.style.height = currentHeight + 'px';
            // $('#olderDownloads').style.height = currentHeight + 'px';
          }
        }
}





$.fn.extend({
        animateCss: function (animationName) {
                var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                $(this).addClass('animated ' + animationName).one(animationEnd, function() {
                        $(this).removeClass('animated ' + animationName);
                });
        }
});
