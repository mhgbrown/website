(function ( $ ) {

  // Set a selection range with the given start and end indicies
  $.fn.setSelection = function( start, end ) {
    return this.each(function( index, element ) {
      if( typeof element.setSelectionRange === "function" ) {
        element.setSelectionRange( start, end );
      }else if( typeof element.createTextRange === "function" ) {
        range = element.createTextRange();
        range.collapse( true );
        range.moveEnd( 'character', start );
        range.moveStart( 'character', end );
        range.select();
      }
    });
  };

  // Set the position of the cursor to the given index
  $.fn.setCaretPosition = function( pos ) {
    return this.each(function( index, element ) {
      $(element).setSelection( pos, pos );
    });
  };

  // Set the position of the cursor to the end
  $.fn.setCaretAtEnd = function() {
    return this.each(function( index, element ) {
      var length = element.value.length;
      $(element).setCaretPosition( length, length );
    });
  };

})( jQuery );