(function( $ ) {

  /**
   * FakeTyper imitates the look of a actual typing.
   *
   * @param {jQuery} $elements A jQuery collection of objects
   * @param {Array} strArray An array of characters
   * @param {Object} Configurable parameters
   **/
  var FakeTyper = function( $elements, strArray, options ) {
    this.$elements = $elements;
    this.strArray = strArray;
    this.options = options;

    this.timer = null;
  };

  /**
   * Begin fake typing
   **/
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

  /**
   * Write the next character in the strArray to the target
   * elements.
   **/
  FakeTyper.prototype.writeNext = function() {
    var nextChar = this.strArray.shift(),
      prevStr = this.$elements.attr( this.options.attribute ) || '';

    if( this.options.beforeEach ) {
      nextChar = this.options.beforeEach.call( this, nextChar );
    }

    this.$elements.attr( this.options.attribute, prevStr + nextChar );
  };

  /**
   * Write out the remaning charcters in strArray and halt fake typing.
   **/
  FakeTyper.prototype.finish = function() {
    this.stop();

    while( this.strArray.length ) {
      this.writeNext();
    }

    if( this.options.done ) {
      this.options.done.call( this );
    }
  };

  /**
   * Halt/pause fake typing
   **/
  FakeTyper.prototype.stop = function() {
    clearTimeout( this.timer );
    this.timer = null;
  };

  /**
   * Start/resume fake typing
   **/
  FakeTyper.prototype.start = FakeTyper.prototype.execute;

  /**
   * Default configuration options for fake typing
   **/
  FakeTyper.defaults = {

    /* the number of milliseconds between each fake keystroke */
    timeout: 300,

    /* the attribute in which to write */
    attribute: 'text',

    /* a callback that is executed before each character is processed
      and whose return value determines what is ultimately written */
    beforeEach: false,

    /* a callback that is executed when fake typing has completed */
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