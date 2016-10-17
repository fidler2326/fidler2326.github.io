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
		          scrollTop: target.offset().top - 10
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
