var n = 0;
$(window).scroll( function(){

/* Check the location of each desired element */
$('.flashing').each( function(i){

    var bottom_of_object = $(this).offset().top + $(this).outerHeight();
    var bottom_of_window = $(window).scrollTop() + $(window).height();

    /* If the object is completely visible in the window, fade it in */
    if( bottom_of_window > bottom_of_object ){

        $(this).addClass("animated fadeInUp");

    }

});

/* Check the location of each desired element */
$('.exits').each( function(i){

    var top_of_object = $(this).offset().top - 200;
    var top_of_window = $(window).scrollTop();

    /* If the object is completely visible in the window, fade it in */
    if( top_of_window > top_of_object && n < 1){
            var that = $(this);
            that.addClass("animated fadeOutUp");
            setTimeout(function(){that.removeClass("animated fadeOutUp")},5000);
            n=1;
        }

});

});

$(function() { 
    $('a[href^="#"]').click(function(event) {
        event.preventDefault();
        var target = $($(this).attr('href')),
            offset = 0;

        if(target.length ){
            $('html, body').animate({
                scrollTop: target.offset().top - offset
            }, 1000);
        }
        
    });
});