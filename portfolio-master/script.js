$(document).ready(function (){


	//Flashing panel buttons when activated
	var $flashing_button = $('[id=flashing]');
	$flashing_button.click(function(){
		$(this).fadeOut(1000)	
		$(this).fadeIn(10,"linear")
	});

	var $flashing_pointer = $('.pointer');
	setInterval(function(){
		$flashing_pointer.fadeOut(600,"linear");
		$flashing_pointer.fadeIn(600,"linear");
	}, 500);

	//Menu gets coloured when document scrolled
	var $win = $(window);
	var $pic = $('.picture');
	var $doc = $(document);
	$win.scroll(function(event){
		var $user_position = $doc.scrollTop()/3;
		$pic.css({top: $user_position});
	});

	$(window).scroll( function(){

    /* Check the location of each desired element */
    $('.hideme').each( function(i){

        var bottom_of_object = $(this).offset().top + $(this).outerHeight()/2;
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        /* If the object is completely visible in the window, fade it in */
        if( bottom_of_window > bottom_of_object ){

            $(this).animate({'opacity':'1'},500);

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


});