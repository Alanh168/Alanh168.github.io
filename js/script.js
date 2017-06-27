$("document").ready(function() {

  // Header fade in on page load
  $(".fade-in").fadeIn(3000);

  // Fade in/out when scrolling to/from header
  $(window).scroll(function(){
    $("#home>.container").css("opacity", 1 - $(window).scrollTop() / 250);
  });

// All Navbar Scripts
  // Animate buttons on click
  var buttons = $(".nav li");
  buttons.onMouseOver(function() {
    buttons.style.transform = "translateX(-10px)";
  });

  // Highlight the nav as scrolling occurs
  $('body').scrollspy({target: 'nav'});

  // Animate scroll when link is clicked:
    // Select all links with hashes
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
             if (target.length) {
               $('html,body').animate({
                   scrollTop: target.offset().top
              }, 1000);
              return false;
          }
      }
  });
});
