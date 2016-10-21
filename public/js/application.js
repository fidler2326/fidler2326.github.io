// Header particles
// ----------------
particlesJS.load('particles-js', '/js/particles.json', function() {
  console.log('callback - particles.js config loaded');
});

// Fixed nav
// ---------
var navPosition = $('nav.main').offset().top;
$(window).scroll(function () {
  if ($(window).scrollTop() > navPosition) {
     $('nav.main,header').addClass('active');
  } else {
     $('nav.main,header').removeClass('active');
  }
});

// Scrollspy
// ---------
$(document).ready(function(){
  var sections = [];
  var scrolled_id = false;
  var id = false;
  var $navBar = $('nav.main ul');
  var $navLink = $navBar.find('.jump-to');

  $navLink.each(function(){
  	sections.push($($(this).attr('href')));
  });

  $(window).scroll(function(e){
    e.preventDefault();
    var scrollTop = $(this).scrollTop() + ($(window).height() / 3);

    for(var i in sections){
    	var section = sections[i];
      if(scrollTop > section.offset().top){
  			scrolled_id = section.attr('id');
      }

      if(scrolled_id !== id){
        id = scrolled_id;
        $navLink.removeClass('active');
        $('a[href="#'+ id + '"]', $navBar).addClass('active');
      }
    }
  });
  $(window).trigger('scroll');
});

//
function checkWidth() {
	  var windowsize = $(window).width();
	  if (windowsize < 720) {
	    $('#carousel ul').removeClass('desktop');
	    $('#carousel ul').addClass('mobile');
	  } else {
	  	$('#carousel ul').removeClass('mobile');
	    $('#carousel ul').addClass('desktop');

		  $('a[href*=#]:not([href=#])').click(function() {
		    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		      var target = $(this.hash);
		      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		      if (target.length) {
		        $('html,body').animate({
		          scrollTop: target.offset().top - 65
		        }, 1000);
		        return false;
		      }
		    }
		  });
	  }
	}

	$(window).resize(function() {
	  checkWidth();
	});

	$(document).ready(function(){
	  checkWidth();
	});
