$(function() {
  var n = 0;
  var m=0;
  $(window).scroll( function(){
    /* Check the location of each desired element */
    $('.exits_left').each( function(i){

        var top_of_object = $(this).offset().top;
        var top_of_window = $(window).scrollTop();

        /* If the object is completely visible in the window, fade it in */
        if( top_of_window > top_of_object && n < 1){
                var that = $(this);
                that.addClass("animated fadeOutLeft");
                setTimeout(function(){that.removeClass("animated fadeOutLeft")},5000);
                n++;
            }

    });
  
    $('.exits_right').each( function(i){

        var top_of_object = $(this).offset().top;
        var top_of_window = $(window).scrollTop();

        /* If the object is completely visible in the window, fade it in */
        if( top_of_window > top_of_object && m < 1){
                var that = $(this);
                that.addClass("animated fadeOutRight");
                setTimeout(function(){that.removeClass("animated fadeOutRight")},5000);
                m++;
            }

    });
    /* Check the location of each desired element */
    $('.slide').each( function(i){

        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        /* If the object is completely visible in the window, fade it in */
        if( bottom_of_window > bottom_of_object ){

            $(this).addClass("animated slideInLeft visible");

        }

    });
  });

  $('#par').enllax();
})