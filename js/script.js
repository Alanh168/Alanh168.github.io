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

  // Animate Sections in on Scroll
  var $animation_elements = $('.animation-element');
  var $window = $(window);

  function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($animation_elements, function() {
      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top;
      var element_bottom_position = (element_top_position + element_height);

      //check to see if this current container is within viewport
      if ((element_bottom_position >= window_top_position) &&
          (element_top_position <= window_bottom_position)) {
        $element.addClass('in-view');
      } else {
        $element.removeClass('in-view');
      }
    });
  }

  $window.on('scroll resize', check_if_in_view);
  $window.trigger('scroll');

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
