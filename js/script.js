$("document").ready(function() {

  // Header fade in on page load
  $(".fade-in").fadeIn(3000);

  // Fade in/out when scrolling to/from header
  $(window).scroll(function(){
    $("#home>.container").css("opacity", 1 - $(window).scrollTop() / 250);
  });

  // Footer Same Height as Navbar
  var height = $(".navbar-default").height();
  $("footer").css("height", height);

  $(".navbar-fixed-top").autoHidingNavbar();

  // Navbar Invisible at top of Page
  $('.navbar-default').css('visibility','hidden');

  // Visible Navbar after scroll
  // $(window).scroll(function () {
  //   if ($(window).scrollTop() = '#') {
  //     $(".navbar").css('visibility', 'visibile');
  //   }
  //   else if ($(window).scrollTop() = 0) {
  //     $('.navbar').css('visibility','hidden');
  //   }
  // });

  // Highlight the top nav as scrolling occurs
  $('body').scrollspy({target: '.navbar-fixed-top'});
});
