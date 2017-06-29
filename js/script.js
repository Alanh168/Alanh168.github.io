$("document").ready(function() {

  // Header fade in on page load
  $(".fade-in").fadeIn(3000);

  // Fade in/out when scrolling to/from header
  $(window).scroll(function(){
    $("#home>.container").css("opacity", 1 - $(window).scrollTop() / 250);
  });

// All Navbar-related Scripts
  // Animate buttons on click
  var buttons = $(".nav li a, .nav-tabs li a, .nav-stacked li a");
  buttons.css('color','yellow');
  buttons.onmouseover = function() {
    console.log("mouseover check");
    buttons.css('color','blue');
    buttons.style.transform = "translateX(-20px)";
  };

  // Highlight the nav as scrolling occurs
  $('body').scrollspy({target: 'nav'});
});
