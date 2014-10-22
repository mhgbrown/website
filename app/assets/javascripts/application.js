// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require_tree .

$(function() {

  var $contentLeft = $('.content-left'),
    $contentRight = $('.content-right');

  function cycleColor() {
    var color = randomColor({ luminosity: 'bright' });
    $contentLeft.css('background-color', color);
    $contentRight.css('color', color);

    $(document)
      .off('mouseenter mouseleave', '.navigation.right a')
      .on({
        mouseenter: function (event) {
          var $target = $(event.target);
          $target.css('background-color', $contentLeft.css('background-color'));
        },
        mouseleave: function (event) {
          var $target = $(event.target);
          $target.css('background-color', 'inherit');
        }
      }, '.navigation.right a')
      .off('mouseenter mouseleave', '.navigation.left a')
      .on({
        mouseenter: function (event) {
          var $target = $(event.target);
          $target.css('color', $contentLeft.css('background-color'));
        },
        mouseleave: function (event) {
          var $target = $(event.target);
          $target.css('color', 'inherit');
        }
      }, '.navigation.left a');

  }

  setInterval(cycleColor, 5000);

});