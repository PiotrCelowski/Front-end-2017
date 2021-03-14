$(function() {
  var $text= $('#slideNumber');
  var updateNumber = setInterval(function(){playItem();}, 100);

  function playItem(){
  	var $number = $('#myCarousel .active').index('#myCarousel .item') + 1;
  	var $totalItems = $('#myCarousel .item').length;
  	$text.html($number + '/' + $totalItems);
  };

  var n = 0;
  $(window).scroll( function(){
    /* Check the location of each desired element */
    $('.exits').each( function(i){

        var top_of_object = $(this).offset().top - 200;
        var top_of_window = $(window).scrollTop();

        /* If the object is completely visible in the window, fade it in */
        if( top_of_window > top_of_object && n < 1){
                var that = $(this);
                that.addClass("animated hinge");
                setTimeout(function(){that.removeClass("animated hinge")},5000);
                n=1;
            }

    });
    /* Check the location of each desired element */
    $('.zoom').each( function(i){

        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        /* If the object is completely visible in the window, fade it in */
        if( bottom_of_window > bottom_of_object ){

            $(this).addClass("animated zoomIn visible");

        }

    });
      /* Check the location of each desired element */
    $('.fadeLeft').each( function(i){

        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        /* If the object is completely visible in the window, fade it in */
        if( bottom_of_window > bottom_of_object ){

            $(this).addClass("animated fadeInLeft visible");

        }

    });

        /* Check the location of each desired element */
    $('.fadeRight').each( function(i){

        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        /* If the object is completely visible in the window, fade it in */
        if( bottom_of_window > bottom_of_object ){

            $(this).addClass("animated fadeInRight visible");

        }

    });
  });

  $('#cont').enllax();
})