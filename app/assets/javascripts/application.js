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
//= require_self

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
          var $target = $(event.target).closest('a'),
            rotator = new CharacterRotator(this);

          $target.css('background-color', $contentLeft.css('background-color'));
          rotator.rotate();
          $target.data('rotator', rotator);
        },
        mouseleave: function (event) {
          var $target = $(event.target).closest('a'),
            rotator = $target.data('rotator');

          $target.css('background-color', 'inherit');
          rotator.restore();
        }
      }, '.navigation.right a')
      .off('mouseenter mouseleave', '.navigation.left a')
      .on({
        mouseenter: function (event) {
          var $target = $(event.target).closest('a'),
            rotator = new CharacterRotator(this);

          $target.css('color', $contentLeft.css('background-color'));
          rotator.rotate();
          $target.data('rotator', rotator);
        },
        mouseleave: function (event) {
          var $target = $(event.target).closest('a'),
            rotator = $target.data('rotator');

          $target.css('color', 'inherit');
          rotator.restore();
        }
      }, '.navigation.left a');

  }

  setInterval(cycleColor, 5000);

});