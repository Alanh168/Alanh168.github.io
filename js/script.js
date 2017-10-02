$("document").ready(function() {

  $(window).on('scroll', function() {
       if (Math.round($(window).scrollTop()) > 50) {
         $('.navbar').addClass('scrolled');
       } else {
         $('.navbar').removeClass('scrolled');
       }
     });

// All Navbar-related Scripts
  // Animate buttons on click
  var buttons = $(".nav li a, .nav-tabs li a, .nav-stacked li a");
  buttons.onmouseover = function() {
    console.log("mouseover check");
    buttons.css('color','blue');
    buttons.style.transform = "translateX(-20px)";
  };

  // Highlight the nav as scrolling occurs
  $('body').scrollspy({target: 'nav'});
});
