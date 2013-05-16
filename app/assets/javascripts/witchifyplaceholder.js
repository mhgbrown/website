$(function() {

  var TIMEOUT          = 1000,
      placeholder      = 'Type to witchify...',
      $witchifierInput = $('#witchifier-input'),
      stopped          = false;

  function witchifyCharacter( ch ) {
    return Witchifier.translate( ch );
  }

  function afterWitchified() {

    if( !stopped ) {
      setTimeout( witchifyPlaceholder, TIMEOUT );
    }
  }

  function witchifyPlaceholder() {
    $witchifierInput.attr( 'placeholder', '' );
    $witchifierInput.fakeType(placeholder, {
      beforeEach: witchifyCharacter,
      done: afterWitchified,
      attribute: 'placeholder',
      timeout: 200
    });
  }

  $witchifierInput.on( 'keyup', function( event ) {
    var fakeTyper = $witchifierInput.data( 'fakeType' );

    if( $witchifierInput.val().length ) {
      stopped = true;
      fakeTyper.stop();
      $witchifierInput.attr( 'placeholder', '' );
    } else {
      stopped = false;

      // prevent crazy witchifying
      if( !fakeTyper || !fakeTyper.timer ) {
        witchifyPlaceholder();
      }
    }

  });

  $witchifierInput.keyup();

});