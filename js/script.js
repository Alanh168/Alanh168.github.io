$("document").ready(function() {

  $(window).on('scroll', function() {
       if (Math.round($(window).scrollTop()) > 50) {
         $('.navbar').addClass('scrolled');
       } else {
         $('.navbar').removeClass('scrolled');
       }
     });

// Loader
  // Show loader until page load

  // Display Page on Load when 2 seconds have passed
  setTimeout(function(){
    $(".loader-container").css({"display": "none"});
  }, 2000);

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

  // Animate Individual Project on Hover
  var project = $(".project");
  project.mouseover(function() {
    console.log("Testing mouseover");
    $(".project p").css("display", "block");
  });
  project.mouseleave(function() {
    console.log("Testing mouseleave");
    $(".project p").css("display", "none");
  });
});
