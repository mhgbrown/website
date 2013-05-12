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
  $('input, textarea').placeholder();
  $('#witchifier-input').witchify().autosize({
  	// keep scroll area up to date with
  	// witchification
  	callback: function() {
      $('html, body').scrollTop( $(this).prop( 'scrollHeight' ) );
  	}
  }).on( 'paste', function( event ) {
  	// make sure that we get a resize
  	// when we paste stuff in
  	$(this).trigger( 'autosize' );
  }).focus();
});