$("document").ready(function() {
  var height = $(".navbar-default").height();
  $("footer").css("height", height);

  // Highlight the top nav as scrolling occurs
  $('body').scrollspy({target: '.navbar-fixed-top'});
});
