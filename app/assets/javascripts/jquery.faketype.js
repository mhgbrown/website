(function( $ ) {

  var FakeTyper = function( $elements, strArray, options ) {
    this.$elements = $elements;
    this.strArray = strArray;
    this.options = options;

    this.timer = null;
  };

  FakeTyper.prototype.execute = function() {
    if( !this.strArray.length ) {

      this.stop();

      if( this.options.done ) {
        this.options.done.call( this );
      }

      return;
    }

    this.writeNext();
    this.timer = setTimeout( $.proxy( this.execute, this ), this.options.timeout );
  };

  FakeTyper.prototype.writeNext = function() {
    var nextChar = this.strArray.shift(),
      prevStr = this.$elements.attr( this.options.attribute ) || '';

    if( this.options.beforeEach ) {
      nextChar = this.options.beforeEach.call( this, nextChar );
    }

    this.$elements.attr( this.options.attribute, prevStr + nextChar );
  };

  FakeTyper.prototype.finish = function() {
    this.stop();

    while( this.strArray.length ) {
      this.writeNext();
    }

    if( this.options.done ) {
      this.options.done.call( this );
    }
  };

  FakeTyper.prototype.stop = function() {
    clearTimeout( this.timer );
    this.timer = null;
  };

  FakeTyper.prototype.start = function() {
    this.execute();
  };

  FakeTyper.defaults = {

    timeout: 300,

    attribute: 'text',

    beforeEach: false,

    done: false

  };

  $.fn.extend({

    /**
     * Imitate the typing of str on the selected elements.
     *
     * @param {String} str The string to fake type.
     * @param {Object} options Configuration parameters for fake typing
     *  timeout: The timeout in milliseconds between fake keystrokes.
     *  attribute: The attribute to type into.
     *  beforeType: A callback executed before a character is typed. The return
     *    value of the function will be the typed character.
     **/
    fakeType: function( str, options ) {
      var options = $.extend( {}, FakeTyper.defaults, options ),
        strArray = str.split(''),
        typer = new FakeTyper( this, strArray, options);

      typer.execute.call( typer );
      this.data( 'fakeType', typer );

      return this;
    }

  });

}( jQuery ));