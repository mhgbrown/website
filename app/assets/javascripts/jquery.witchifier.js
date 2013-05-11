// TODO: Bookmarklet
(function( $ ) {

  /**
   * Witchifier manages the transformation of normal characters to
   * "witchified" ones.
   **/
  var Witchifier = {};

  /**
   * The default options for $.fn.witchify.
   **/
  Witchifier.defaults = {

    /* Randomize the translated characters */
    randomize: true,

    /* Use a custom dictionary for this witchifier session */
    dictionary: {}

  };

  /**
   * Translate the given value, retriveing it's translation from
   * the dictionary cache or randomly generating a new one if
   * there is a miss or randomization is enabled.
   *
   * @param {string} value A character to be translated.
   * @param {options} object The current options for witchifier.
   **/
  Witchifier.translate = function( value, options ) {
    var shouldNotRandomize = !options.randomize,
      targetTranslations,
      randomIndex,
      translation;

    if( options.dictionary[ value ] && shouldNotRandomize ) {
      return options.dictionary[ value ];
    }

    targetTranslations = this.DICTIONARY[ value ];
    if( !targetTranslations ) {
      return value;
    }

    randomIndex = Math.floor( Math.random() * targetTranslations.length );
    translation = targetTranslations[ randomIndex ];
    shouldNotRandomize && (options.dictionary[ value ] = translation);

    return translation;
  };

  /**
   * Translate a user's keypress into a witchified character.
   *
   * @param {jQuery.Event} event The event that triggered the keypress
   **/
  Witchifier.onkeypress  = function( event ) {
    var $target = $(event.target),
      key = String.fromCharCode( event.which ),
      translation,
      translatedEvent;

      if( event.originalEvent ) {
        event.preventDefault();
        $target.sendkeys( this.translate( key, event.data ) );
      }
  };

  /**
   * Translate and insert any pasted text.
   *
   * @param {jQuery.Event} event The event that triggered the paste
   **/
  Witchifier.onpaste  = function( event ) {
    var $target = $(event.target),
      pastedText = '',
      i = 0,
      translatedText = '';

    // IE
    if ( window.clipboardData && window.clipboardData.getData ) {
      pastedText = window.clipboardData.getData( 'Text' );
    // legitimate browsers
    } else if ( event.originalEvent.clipboardData && event.originalEvent.clipboardData.getData ) {
      pastedText = event.originalEvent.clipboardData.getData( 'text/plain' );
    }

    i = pastedText.length;

    while( i-- ) {
      translatedText = this.translate( pastedText.charAt( i ), event.data ) + translatedText;
    }

    $target.sendkeys( translatedText );
    event.preventDefault();
  };

  /**
   * The master dictionary from which to derive translations.
   **/
  Witchifier.DICTIONARY = {
      'A' : ['Ⓐ', 'A', 'Ạ', 'Å', 'Ä', 'Ả', 'Ḁ', 'Ấ', 'Ầ', 'Ẩ', 'Ȃ', 'Ẫ', 'Ậ', 'Ắ', 'Ằ', 'Ẳ', 'Ẵ', 'Ặ', 'Ā', 'Ą', 'Ȁ', 'Ǻ', 'Ȧ', 'Á', 'Ǟ', 'Ǎ', 'À', 'Ã', 'Ǡ', 'Â', 'Ⱥ', 'Æ', 'Ǣ', 'Ǽ', 'Ɐ', 'Ꜳ', 'Ꜹ', 'Ꜻ', 'Ɑ', '⅍', '⟁'],
      'a' : ['ⓐ', '⒜', 'ɐ', 'a', 'ɒ', 'ạ', 'å', 'ä', 'ả', 'ḁ', 'ấ', 'ầ', 'ẩ', 'ȃ', 'ẫ', 'ậ', 'ắ', 'ằ', 'ẳ', 'ẵ', 'ặ', 'ā', 'ą', 'ȁ', 'ǻ', 'ȧ', 'á', 'ǟ', 'ǎ', 'à', 'ã', 'ǡ', 'â', 'ⱥ', 'æ', 'ǣ', 'ǽ', 'ꜳ', 'ꜹ', 'ꜻ', '℀', '℁', 'ª'],
      'B' : ['Ⓑ', 'B', 'Ḃ', 'Ḅ', 'Ḇ', 'Ɓ', 'Ƀ', 'Ƃ', 'Ƅ', 'ℬ'],
      'b' : ['ⓑ', '⒝', 'b', 'ḃ', 'ḅ', 'ḇ', 'ƀ', 'ƃ', 'ƅ'],
      'C' : ['Ⓒ', 'C', 'Ḉ', 'Ć', 'Ĉ', 'Ċ', 'Č', 'Ç', 'Ƈ', 'Ȼ', 'ℂ', 'Ɔ', 'Ꜿ', 'ℭ', '℅'],
      'c' : ['ⓒ', '⒞', 'c', 'ḉ', 'ć', 'ĉ', 'ċ', 'č', 'ç', 'ƈ', 'ȼ', '℃', 'ꜿ', '℆', '℄'],
      'D' : ['Ⓓ', 'D', 'Ḋ', 'Ḍ', 'Ḏ', 'Ḑ', 'Ḓ', 'Ď', 'Ɗ', 'Ƌ', 'Ɖ', 'Đ', 'Ǳ', 'ǲ', 'Ǆ', 'ǅ', 'ⅅ'],
      'd' : ['ⓓ', '⒟', 'd', 'ḋ', 'ḍ', 'ḏ', 'ḑ', 'ḓ', 'ď', 'ƌ', 'đ', 'ȡ', 'ǳ', 'ǆ', 'ȸ', 'ⅆ'],
      'E' : ['Ⓔ', 'E', 'Ḕ', 'Ḗ', 'Ḙ', 'Ḛ', 'Ḝ', 'Ẹ', 'Ẻ', 'Ế', 'Ẽ', 'Ề', 'Ể', 'Ễ', 'Ệ', 'Ē', 'Ĕ', 'Ė', 'Ę', 'Ě', 'È', 'É', 'Ê', 'Ë', 'Ȅ', 'Ȩ', 'Ȇ', 'Ǝ', 'Ɇ', 'Ə', 'ℰ', '℮', 'Ɛ'],
      'e' : ['ⓔ', '⒠', 'e', 'ḕ', 'ḗ', 'ḙ', 'ḛ', 'ḝ', 'ẹ', 'ẻ', 'ế', 'ẽ', 'ề', 'ể', 'ễ', 'ệ', 'ē', 'ĕ', 'ė', 'ę', 'ě', 'è', 'é', 'ê', 'ë', 'ȅ', 'ȩ', 'ȇ', 'ⱻ', 'ɇ', 'ǝ', 'ⱸ', 'ℯ', 'ℇ'],
      'F' : ['Ⓕ', 'F', 'Ḟ', 'Ƒ', 'Ⅎ', 'ꟻ', 'ℱ', '℻'],
      'f' : ['ⓕ', '⒡', 'f', 'ḟ', 'ƒ', 'ꜰ', 'ⅎ', 'ᵮ', '∱'],
      'G' : ['Ⓖ', 'G', 'Ɠ', 'Ḡ', 'Ĝ', 'Ğ', 'Ġ', 'Ǥ', 'Ǧ', 'Ǵ', '⅁', 'Ģ'],
      'g' : ['ⓖ', '⒢', 'g', 'ḡ', 'ĝ', 'ğ', 'ġ', 'ǥ', 'ǧ', 'ℊ', 'ǵ', 'ģ'],
      'H' : ['Ⓗ', 'ⓗ', 'H', 'Ḣ', 'Ḥ', 'Ḧ', 'Ḩ', 'Ḫ', 'Ĥ', 'Ȟ', 'Ħ', 'Ⱨ', 'Ꜧ', 'ℍ', 'Ƕ', 'ℋ', 'ℌ', 'ᾟ'],
      'h' : ['ⓗ', '⒣', 'h', 'ḣ', 'ḥ', 'ḧ', 'ḩ', 'ḫ', 'ĥ', 'ȟ', 'ħ', 'ⱨ', 'ẖ', 'ℏ', 'ℎ', 'ꜧ', 'ᖾ'],
      'I' : ['Ⓘ', 'I', 'Ḭ', 'Ḯ', 'Ĳ', 'Í', 'Ì', 'Î', 'Ï', 'Ĩ', 'Ī', 'Ĭ', 'Į', 'Ǐ', 'ƚ', 'Ỻ', 'ⅉ', 'ℑ', 'ℐ'],
      'i' : ['ⓘ', '⒤', 'i', 'ḭ', 'ḯ', 'ĳ', 'í', 'ì', 'î', 'ï', 'ĩ', 'ī', 'ĭ', 'į', 'ǐ', 'ı', 'ⅈ', 'ℹ'],
      'J' : ['Ⓙ', 'J', 'Ĵ', 'Ɉ', 'ȷ', 'ǰ'],
      'j' : ['ⓙ', '⒥', 'j', 'ĵ', 'ɉ', 'ⱼ'],
      'K' : ['Ⓚ', 'K', 'Ḱ', 'Ḳ', 'Ḵ', 'Ķ', 'Ƙ', 'Ꝁ', 'Ꝃ', 'Ꝅ', 'Ǩ', 'Ⱪ', 'ĸ'],
      'k' : ['ⓚ', '⒦', 'k', 'ḱ', 'ḳ', 'ḵ', 'ķ', 'ƙ', 'ꝁ', 'ꝃ', 'ꝅ', 'ǩ', 'ⱪ',],
      'L' : ['Ⓛ', 'L', 'Ḷ', 'Ḹ', 'Ḻ', 'Ḽ', 'Ĺ', 'Ļ', 'Ľ', 'Ŀ', 'Ł', 'Ỉ', 'Ⱡ', 'Ƚ', 'Ꝉ', 'Ǉ', 'ǈ', 'Ị', 'İ', '⅃', '⅂', 'Ȉ', 'Ȋ', 'ℒ'],
      'l' : ['ⓛ', '⒧', 'l', 'ḷ', 'ḹ', 'ḻ', 'ḽ', 'ĺ', 'ļ', 'ľ', 'ŀ', 'ł', 'ỉ', 'ⱡ', 'ꝉ', 'Ɫ', 'ǉ', 'ꞁ', 'ȉ', 'ȋ', 'ℓ', 'ị',],
      'M' : ['Ⓜ', 'M', 'Ḿ', 'Ṁ', 'Ṃ', 'ꟿ', 'ꟽ', 'Ɱ', 'Ɯ', 'ℳ'],
      'm' : ['ⓜ', '⒨', 'm', 'ḿ', 'ṁ', 'ṃ'],
      'N' : ['Ⓝ', 'N', 'Ṅ', 'Ṇ', 'Ṉ', 'Ṋ', 'Ń', 'Ņ', 'Ň', 'Ǹ', 'Ñ', 'Ƞ', 'Ŋ', 'Ɲ', 'Ǌ', 'ǋ', 'ℕ', '№'],
      'n' : ['ⓝ', '⒩', 'n', 'ṅ', 'ṇ', 'ṉ', 'ṋ', 'ń', 'ņ', 'ň', 'ǹ', 'ñ', 'ƞ', 'ŋ', 'ŉ', 'ǌ', 'ȵ'],
      'O' : ['Ⓞ', 'O', 'Ö', 'Ṏ', 'Ṍ', 'Ṑ', 'Ṓ', 'Ȫ', 'Ȭ', 'Ȯ', 'Ȱ', 'Ǫ', 'Ǭ', 'Ọ', 'Ỏ', 'Ố', 'Ồ', 'Ổ', 'Ỗ', 'Ộ', 'Ớ', 'Ờ', 'Ở', 'Ỡ', 'Ợ', 'Ơ', 'Ō', 'Ŏ', 'Ő', 'Ò', 'Ó', 'Ô', 'Õ', 'Ǒ', 'Ȍ', 'Ȏ', 'Œ', 'Ø', 'Ǿ', 'Ꝋ', 'Ꝏ', '⍥'],
      'o' : ['ⓞ', '⒪', 'o', 'ö', 'ṏ', 'ṍ', 'ṑ', 'ṓ', 'ȫ', 'ȭ', 'ȯ', 'ȱ', 'ǫ', 'ǭ', 'ọ', 'ỏ', 'ố', 'ồ', 'ổ', 'ỗ', 'ộ', 'ớ', 'ờ', 'ở', 'ỡ', 'ợ', 'ơ', 'ō', 'ŏ', 'ő', 'ò', 'ó', 'ô', 'õ', 'ǒ', 'ȍ', 'ȏ', 'œ', 'ø', 'ǿ', 'ꝏ', '⍤', 'ℴ'],
      'P' : ['Ⓟ', 'P', 'Ṕ', 'Ṗ', 'Ƥ', 'Ᵽ', 'ℙ', 'ꟼ'],
      'p' : ['ⓟ', '⒫', '℗', 'p', 'ṕ', 'ṗ', 'ƥ', 'Ƿ', '℘'],
      'Q' : ['Ⓠ', 'Q', 'Ɋ', 'ℚ'],
      'q' : ['ⓠ', '⒬', 'q', 'ɋ', '℺', 'ȹ'],
      'R' : ['Ⓡ', 'R', 'Ŕ', 'Ŗ', 'Ř', 'Ṙ', 'Ṛ', 'Ṝ', 'Ṟ', 'Ȑ', 'Ȓ', 'Ɍ', 'Ʀ', 'Ꝛ', 'Ɽ', '℞', 'ℜ', 'ℛ', '℟', 'ℝ'],
      'r' : ['ⓡ', '⒭', 'r', 'ŕ', 'ŗ', 'ř', 'ṙ', 'ṛ', 'ṝ', 'ṟ', 'ȑ', 'ȓ', 'ɍ', 'ꝛ'],
      'S' : ['Ⓢ', 'S', 'Ṡ', 'Ṣ', 'Ṥ', 'Ṧ', 'Ṩ', 'Ś', 'Ŝ', 'Ş', 'Š', 'Ș', 'ȿ', 'Ƨ', 'Ϩ', 'ϩ', 'ẞ', 'ẛ', 'ẝ', '℠'],
      's' : ['ⓢ', '⒮', 's', 'ṡ', 'ṣ', 'ṥ', 'ṧ', 'ṩ', 'ś', 'ŝ', 'ş', 'š', 'ș', 'ꜱ', 'ƨ', 'ß', 'ẜ'],
      'T' : ['Ⓣ', 'T', 'Ṫ', 'Ṭ', 'Ṯ', 'Ṱ', 'Ţ', 'Ť', 'Ŧ', 'Ț', 'Ⱦ', 'Ƭ', 'Ʈ', '℡', '™'],
      't' : ['ⓣ', '⒯', 't', 'ṫ', 'ṭ', 'ṯ', 'ṱ', 'ţ', 'ť', 'ŧ', 'ț', 'ⱦ', 'ƫ', 'ƭ', 'ẗ', 'ȶ', 'ᚋ', '†', '✝', '✞', '┼', '†', '✟'],
      'U' : ['Ⓤ', 'U', 'Ṳ', 'Ṵ', 'Ṷ', 'Ṹ', 'Ṻ', 'Ủ', 'Ụ', 'Ứ', 'Ừ', 'Ử', 'Ữ', 'Ự', 'Ũ', 'Ū', 'Ŭ', 'Ů', 'Ű', 'Ǚ', 'Ǘ', 'Ǜ', 'Ų', 'Ǔ', 'Ȕ', 'Û', 'Ȗ', 'Ù', 'Ú', 'Ü', 'Ư', 'Ʉ', 'Ʊ'],
      'u' : ['ⓤ', '⒰', 'u', 'ṳ', 'ṵ', 'ṷ', 'ṹ', 'ṻ', 'ủ', 'ụ', 'ứ', 'ừ', 'ử', 'ữ', 'ự', 'ũ', 'ū', 'ŭ', 'ů', 'ű', 'ǚ', 'ǘ', 'ǜ', 'ų', 'ǔ', 'ȕ', 'û', 'ȗ', 'ù', 'ú', 'ü', 'ư', 'Ʋ'],
      'V' : ['Ⓥ', 'V', 'Ṽ', 'Ṿ', 'Ʌ', '℣', 'ⱱ', 'ⱽ'],
      'v' : ['ⓥ', '⒱', 'v', 'ṽ', 'ṿ', 'Ỽ', 'ⱴ'],
      'W' : ['Ⓦ', 'W', 'Ẁ', 'Ẃ', 'Ẅ', 'Ẇ', 'Ẉ', 'Ŵ', 'Ⱳ', 'Ϣ', 'ẘ'],
      'w' : ['ⓦ', '⒲', 'w', 'ẁ', 'ẃ', 'ẅ', 'ẇ', 'ẉ', 'ŵ', 'ⱳ', 'ϣ'],
      'X' : ['Ⓧ', 'X', 'Ẋ', 'Ẍ', 'ℵ', 'χ'],
      'x' : ['ⓧ', '⒳', 'x', 'ẋ', 'ẍ', '×', '×', 'ϗ', '✘', '✖'],
      'Y' : ['Ⓨ', 'Y', 'Ẏ', 'Ỿ', 'Ỳ', 'Ỵ', 'Ỷ', 'Ỹ', 'Ŷ', 'Ƴ', 'Ÿ', 'Ý', 'Ɏ', 'Ȳ', 'Ɣ', '⅄', 'ℽ'],
      'y' : ['ⓨ', '⒴', 'y', 'ẏ', 'ỿ', 'ỳ', 'ỵ', 'ỷ', 'ỹ', 'ŷ', 'ƴ', 'ÿ', 'ý', 'ɏ', 'ȳ', 'ẙ'],
      'Z' : ['Ⓩ', 'Z', 'Ẑ', 'Ẓ', 'Ẕ', 'Ź', 'Ż', 'Ž', 'Ȥ', 'Ⱬ', 'Ƶ', 'ɀ', 'ℨ', 'ℤ'],
      'z' : ['ⓩ', '⒵', 'z', 'ẑ', 'ẓ', 'ẕ', 'ź', 'ż', 'ž', 'ȥ', 'ⱬ', 'ƶ'],
      '\'': ['ᷓ', '᷁', '΅', '῁', '⁗', '▝', '◜', '❜', '˚'],
      '.' : ['⁂', '•', '᷏', '█', '■', '□', '◆', '◇', '●', '◬'],
      ',' : ['ι', '▗', '◞', '⟀'],
      '!' : ['‽', '‼', '❣', '❢', '¡', '↯'],
      '?' : ['‽', '⁇', '≟', '¿', 'Ɂ', 'ɂ', 'ʖ'],
      '(' : ['᚜', '⁌', '⋘', '◖', '◀', '◁', '❮', '❰', '❲', '⟦', '⟪'],
      ')' : ['᚛', '⁍', '⋙', '◗', '▶', '▷', '❯', '❱', '❳', '⟧', '⟫'],
      ':' : ['⁑', '⁝', '⁞', '▞', '▚','ː'],
      '-' : ['⁓', '∹', '∺', '⊝', '➳', '➵', '⟺', '⟿'],
      '_' : ['‿'],
      '*' : ['⊛', '◦', 'ᚕ', '✣', '✤', '✥', '✩', '✱', 'ᢆ', '⁎', '⁕', '⁙', '※'],
      '/' : ['⋰'],
      '\\':  ['⋱']
    };

  /**
   * Translates whatever you type into glitchy letters.
   *
   * @param {Object} options Configure the witchifier
   **/
  $.fn.witchify = function( options ) {
    var options = $.extend( {}, Witchifier.defaults, options );

    return this.each( function( index, element ) {
      $(this).on( 'keypress', options, $.proxy( Witchifier.onkeypress, Witchifier ) );
      $(this).on( 'paste', options, $.proxy( Witchifier.onpaste, Witchifier ) );
    });
  };

}( jQuery ));