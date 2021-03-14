$(function() {
  var $menu = $('#menu'),
      $jumbo = $('.jumbotron');

  $(window).scroll(function(event) {
    if ($(document).scrollTop() > 0) {
      $menu.attr('data-active', true);
      $menu.addClass('animated bounceIn');
      $jumbo.attr('active-menu', true);
    } else {
      $menu.removeAttr('data-active');
      $jumbo.removeAttr('active-menu');
    };
  });
});

$(window).scroll( function(){

  /* Check the location of each desired element */
  $('.fadeInL').each( function(i){

      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();

      /* If the object is completely visible in the window, fade it in */
      if( bottom_of_window > bottom_of_object ){

          $(this).addClass("animated fadeInLeft visible");

      }

  });
  $('.fadeInR').each( function(i){

      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();

      /* If the object is completely visible in the window, fade it in */
      if( bottom_of_window > bottom_of_object ){

          $(this).addClass("animated fadeInRight visible");

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