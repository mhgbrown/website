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

  var MAX_OFFSET = 1000;
  var SCROLL_TOP_THRESHOLD = 75;
  var oldScrollTop = $(window).scrollTop();

  function getImage() {
    var offset = Math.floor(Math.random() * MAX_OFFSET);

    $.getJSON('http://api.tumblr.com/v2/blog/discom4rt.tumblr.com/likes?callback=?', {
      api_key: 'ok1dCktUCXTyOgG0vlyhxcW7oQ4lxUZl0QfZkoEiwwjvU2ZKAv',
      offset: offset,
      limit: 1
    }).then(function(json) {
      var $moodSetter = $('<img>');

      if(!json.response.liked_posts[0] || !json.response.liked_posts[0].photos || !json.response.liked_posts[0].photos.length) {
        console.warn('found post with no images!')
        return getImage();
      }

      var photos = json.response.liked_posts[0].photos;
      var rpindex = Math.floor(Math.random() * photos.length);

      $moodSetter.attr({
        src: photos[rpindex].original_size.url
      }).on('load', function(event) {
        $moodSetter.addClass('mood-setter');
        $('body').append($moodSetter);

        var pt = (Math.random() * ($(document).height() - $moodSetter[0].height));
        var pl = (Math.random() * ($(document).width() - $moodSetter[0].width));

        $moodSetter.css({
          top: pt,
          left: pl,
          visibility: 'visible'
        });
      });
    });
  }

  function swapImages(event) {
    var newScrollTop = $(window).scrollTop();

    if(Math.abs(newScrollTop - oldScrollTop) > SCROLL_TOP_THRESHOLD) {
      var $images = $('img');
      var rindex = Math.floor(Math.random() * $images.length);
      $('img:last').swap($('img:eq(' + rindex +')'));
      console.dir(newScrollTop, oldScrollTop);
      oldScrollTop = newScrollTop;

    }
  }

  $('.work').randomize()
  setInterval(getImage, 5000);
  getImage();

  // disable for now
  // $(window).on('scroll', swapImages);
});
