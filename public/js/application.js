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

// Animation in
// ------------
(function($) {
$.fn.visible = function(partial) {
  var $t            = $(this),
      $w            = $(window),
      viewTop       = $w.scrollTop() - 100,
      viewBottom    = viewTop + $w.height(),
      _top          = $t.offset().top,
      _bottom       = _top + $t.height(),
      compareTop    = partial === true ? _bottom : _top,
      compareBottom = partial === true ? _top : _bottom;
  return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
};
})(jQuery);

var win = $(window);

var allMods = $(".animate-in");

allMods.each(function(i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass("already-visible");
  }
});

win.scroll(function(event) {
  allMods.each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("come-in");
    }
  });
});

function checkWidth() {
  var windowsize = $(window).width();
  if (windowsize < 720) {
    $('#carousel ul').removeClass('desktop');
    $('#carousel ul').addClass('mobile');

    // Stop page scrolling after window resize
    $('.jump-to').on('click', function() {
      $('html,body').stop(true);
      return false;
    });

    // Disable scrollspy
    // $(window).off('scroll');

    var scrollState = false;
    scrollSpy(scrollState);

  } else {
  	$('#carousel ul').removeClass('mobile');
    $('#carousel ul').addClass('desktop');

    var scrollState = true;
    scrollSpy(scrollState);

    // Jump to links
    // -------------
    $('.jump-to').on('click', function() {
      var selected = $(this).data('section');
      $('html,body').stop(true, false).animate({
        scrollTop: $('#' + selected).offset().top - 65
      }, 1000);
    });

  }
}

// Scrollspy
// ---------
function scrollSpy(scrollState) {
  if (scrollState == true) {
    var sections = [];
    var scrolled_id = false;
    var id = false;
    var $navBar = $('.scrollspy');
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
  }
}

$(document).ready(function(){
  checkWidth();
});

$(window).resize(function() {
  checkWidth();
});


// Skills
// ------
var count = 0;

var skills = [
  "<span>H</span><span>T</span><span>M</span><span>L</span>",
  "<span>C</span><span>S</span><span>S</span><span>/</span><span>S</span><span>A</span><span>S</span><span>S</span>",
  "<span>J</span><span>a</span><span>v</span><span>a</span><span>s</span><span>c</span><span>r</span><span>i</span><span>p</span><span>t</span>",
  "<span>R</span><span>u</span><span>b</span><span>y</span>&nbsp;<span>o</span><span>n</span>&nbsp;<span>R</span><span>a</span><span>i</span><span>l</span><span>s</span>",
  "<span>R</span><span>e</span><span>a</span><span>c</span><span>t</span>&nbsp;<span>J</span><span>S</span>",
  "<span>W</span><span>o</span><span>r</span><span>d</span><span>p</span><span>r</span><span>e</span><span>s</span><span>s</span>",
  "<span>A</span><span>n</span><span>g</span><span>u</span><span>l</span><span>a</span><span>r</span>&nbsp;<span>J</span><span>S</span>",
  "<span>C</span><span>r</span><span>a</span><span>f</span><span>t</span>&nbsp;<span>C</span><span>M</span><span>S</span>",
  "<span>P</span><span>h</span><span>o</span><span>n</span><span>e</span><span>g</span><span>a</span><span>p</span>",
  "<span>H</span><span>T</span><span>M</span><span>L</span>&nbsp;<span>E</span><span>m</span><span>a</span><span>i</span><span>l</span>",
  "<span>P</span><span>h</span><span>o</span><span>t</span><span>o</span><span>s</span><span>h</span><span>o</span><span>p</span>",
  "<span>S</span><span>k</span><span>e</span><span>t</span><span>c</span><span>h</span>"
];

var animateClass = [
  'scale',
  'slide-down',
  'slide-up',
  'slide-left',
  'slide-right'
];

getSkill();
setInterval('getSkill()', 2500);

function getSkill() {
  if(count < skills.length) {
    var selected = skills[count];
    var randomClass = animateClass[Math.floor(Math.random()*animateClass.length)];
    console.log(randomClass);
    $('#skills').attr('class', '');
    $('#skills').addClass(randomClass);
    $('#skills').html(selected);
    count = count + 1;
  } else {
    count = 0;
    getSkill();
  }
}
