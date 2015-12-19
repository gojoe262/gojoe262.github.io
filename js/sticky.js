//Credit to: http://andrewhenderson.me/tutorial/jquery-sticky-sidebar/
//Modified by Joe Schueller to be a jquery plugin.
$(function(){
    if (!!$('.sticky').offset()) {
        var stickyTop = $('.sticky').offset().top;
        var stickyLeft = $('.sticky').offset().left;
        $(window).scroll(function(){
            var windowTop = $(window).scrollTop();
            if (stickyTop < windowTop){
                $('.sticky').css({ position: 'fixed', top: 0,  left: stickyLeft });
            }
            else {
                $('.sticky').css('position','static');
            }
        });
    }
});
