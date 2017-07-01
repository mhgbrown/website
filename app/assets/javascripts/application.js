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
  var MAX_IMAGES_COUNT = 10;
  var IMAGE_LOAD_INTERVAL = 2500

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
        var $images = $('img')

        if ($images.length > MAX_IMAGES_COUNT) {
          $images.first().remove()
        }

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

  $('.work').randomize()
  setInterval(getImage, IMAGE_LOAD_INTERVAL);
  getImage();
});
