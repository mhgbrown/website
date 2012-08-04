/**
 * A method to translate characters into another representation and then write them to
 * another element.  In the case, the other representation happens to be witch house-y.  Relies
 * on hinderinputjs-rails.
 **/
(function ( $ ) {

  /**
   * Enable withifier translations from input given to the selected element.
   *
   * @param {object} options The configuration that should be used when witchifying.
   *  output: The element(s) that will have translations written to it/them.
   *  dictionary: A cache of generated translations.
   **/
  var witchifier = $.fn.witchifier = function( options ) {
    var options = $.extend( {}, witchifier.defaults, options ),
      translation,
      tindex;

    options.output = $(options.output);

    // Prepare the dictionary for this witchifying session
    translation = witchifier.translate( '(', options );
    tindex = witchifier.DICTIONARY[ '(' ].indexOf( translation );
    options.dictionary[ ')' ] = witchifier.DICTIONARY[ ')' ][ tindex ];

    return this.each(function( index, element ) {
      $(this).hinderInput({
        onAdd: function( value ) {
          var translation = witchifier.translate.call( witchifier, value, options );
          options.output.text( options.output.text() + translation );
        },
        onDelete: function() {
          witchifier.erase.call( witchifier, options );
        }
      });
    });
  };

  /**
   * Erase the last character from the output field.
   *
   * @param {options} object The current options for witchifier.
   **/
  witchifier.erase = function( options ) {
    var $target = options.output,
      text = $target.text();

    if ( text.length ) {
        $target.text( text.substring(0, text.length - 1) );
    }
  };

  /**
   * Translate the given value, retriveing it's translation from
   * the dictionary cache or randomly generating a new one if
   * there is a miss.
   *
   * @param {string} value A character to be translated.
   * @param {options} object The current options for witchifier.
   **/
  witchifier.translate = function( value, options ) {
    var $target = options.output,
      targetTranslations,
      randomIndex,
      translation;

    if( options.dictionary[value] ) {
      return options.dictionary[ value ];
    }

    targetTranslations = this.DICTIONARY[ value ];
    if( !targetTranslations ) {
      return value;
    }

    randomIndex = Math.floor( Math.random() * targetTranslations.length );
    translation = targetTranslations[ randomIndex ];
    options.dictionary[ value ] = translation;

    return translation;
  };

  /**
   * The default options for witchifier. "output" is
   * where the translated characters are written and can be anything
   * that is jQuery selectable. "dictionary" is used to cache
   * generated translations.  It can be used to override automatically
   * generated translations.
   **/
  witchifier.defaults = {
    output: null,
    dictionary: {}
  };

  /**
   * The master dictionary from which to derive translations.
   **/
  witchifier.DICTIONARY = {
      'A' : ['Æ', 'Ą', 'Ⱥ', 'Ʌ', 'Δ', 'Ѧ', 'Ꭿ', 'Ꮜ', 'Ꮞ', '4', 'ᐑ', 'ᐰ', 'ᕔ', 'ᗄ', '▲', '△'],
      'a' : ['@', 'ą', 'ɐ', 'ɒ', 'ʌ', '٨', '⊼'],
      'B' : ['ß', 'Ɓ', 'Ƀ', 'ɮ', 'Ѯ', 'ਊ', '฿', 'ᗿ', 'ᙘ', 'ẞ', 'ℬ', 'ɮ'],
      'b' : ['Ƃ', 'ƃ', 'Ƅ', 'ɞ', 'ʪ', 'Ђ', 'Ⴊ', 'Ꮡ', 'ᒀ', 'ᔎ', 'ᔽ', 'ᵬ'],
      'C' : ['Ç', 'Ɔ', 'Ƈ', 'ɔ', 'ɕ', 'Ꮸ', 'ᑤ', 'ᔍ', 'ᙍ'],
      'c' : ['¢', 'ƈ', 'ე', 'ᓖ', '⊑', '⋐'],
      'D' : ['Ð', 'Ɗ', 'ם', 'Ⴇ', 'ᐇ', 'ᗍ'],
      'd' : ['ð', 'đ', 'Ƌ', 'ȡ', 'ժ', 'Ⴛ', 'ᑼ', '⋑'],
      'E' : ['£', 'Ę', 'Ǝ', 'Ɛ', 'Ƹ', 'Ξ', 'Є', 'Ӛ', '੬', 'ᓬ', 'ᕮ', '⁅', '∄', '∋'],
      'e' : ['Ə', 'ƺ', 'ə', 'ɚ', 'ξ', '⋳', '⋵', '€'],
      'F' : ['Ƒ', 'ि', 'Ꭶ', 'ᖶ'],
      'f' : ['ƒ', 'Բ', 'Ꮈ', 'ᵮ', '∮', '∱'],
      'G' : ['Ɠ', 'Ǥ', 'Ԍ', 'Ᏻ', 'ᘑ'],
      'g' : ['ɠ', 'Ꮽ', 'ᕥ', 'ᘝ', 'ɠ', '❡'],
      'H' : ['Ħ', 'Ƕ', 'Ԣ', 'મ', 'ỻ'],
      'h' : ['ƕ', 'Ђ', 'ᑋ', 'ᖾ', '⁁', 'ђ'],
      'I' : ['Į', 'ǁ', 'ᔫ', '‡', '▍', 'Ꮠ', 'Ɨ'],
      'i' : ['¡','¦', 'ɨ', 'ɻ', 'ᓾ', '✝', 'ℷ', 'ї'],
      'J' : ['Ɉ', 'ل', 'Ꮦ', 'ᒏ', 'ᒠ'],
      'j' : ['ƾ', 'ɉ', 'ك', 'Ꮰ', 'ǰ'],
      'K' : ['Ƙ', 'ʞ', 'Ҝ', 'Ԗ'],
      'k' : ['ƙ', 'ƛ', 'ɮ', 'ʫ'],
      'L' : ['Ĺ', 'Ł', 'Ƚ', 'ᒸ'],
      'l' : ['ł', 'Լ', 'Ꮭ', '⇂', 'ɭ'],
      'M' : ['ʍ', 'ʭ', 'ϻ', 'Ѫ', 'Ҧ', 'ਆ', 'ᓬ', 'ᙨ', 'Ɱ'],
      'm' : ['Ɯ', 'ɰ', 'ɱ', 'ѫ', 'Պ', 'տ', 'ॡ', 'ਲ', '♏', '♍'],
      'N' : ['Ɲ', 'Π', 'И', 'Ԉ', 'א', 'ᑍ', '∏'],
      'n' : ['ŋ', 'ƞ', 'ȵ', 'ԉ', 'Ո', 'ո', 'Ꮬ', 'ᕅ', 'ᕣ', 'ᘚ', 'ᾖ', 'ᴒ', '♑', '♌'],
      'O' : ['Ø', 'Ƣ', 'ם', 'Ꭴ', 'ᗜ', '◉', '◌', '◎'],
      'o' : ['¤', '°', 'º', 'ø', 'ƣ', 'ȣ', 'ɷ', 'Ջ', 'ᓁ', 'ᓊ', 'ỽ', '◊', '❍', 'ð', '♁'],
      'P' : ['¶', 'Þ', 'Ԗ', 'Ⴒ', 'Ꭾ', 'ᕈ', '▛', '℘'],
      'p' : ['þ', 'ƍ', 'ȹ', 'Թ', 'ք', 'Ꮔ', 'ᑬ', 'ᖀ', 'ᵱ'],
      'Q' : ['Ɋ', 'Ҩ', 'Ⴔ', 'ᕋ', '▜'],
      'q' : ['ƪ', 'ƻ', 'Զ', 'Գ', 'ᑵ', 'ᙯ', 'ɬ'],
      'R' : ['Ʀ', 'ʁ', 'Я', 'Ԅ', 'ᖈ', 'ℜ'],
      'r' : ['ζ', 'ґ', 'ӷ', 'ᒌ', 'ŗ'],
      'S' : ['$', '§', 'Ƨ', 'ϟ', 'Տ', 'Ֆ', 'ᔓ'],
      's' : ['ƨ', 'ʂ', 'ٸ', 'ᴤ'],
      'T' : ['Ţ', 'Ŧ', 'Ƭ', 'Ԏ', 'Շ', 'ד', 'ौ', 'ᚘ', '⟙', '╀'],
      't' : ['±', 'ŧ', 'ƫ', 'ȶ', 'ᚂ', 'ᚋ', 'ᵵ', '†', '✝', '✞', 'ɬ', '┼', '†'],
      'U' : ['Ȣ', 'Ҵ', 'Ԏ', 'Ա', 'ᕟ', '∐'],
      'u' : ['µ', 'ȣ', 'ʊ', 'Կ', 'प', 'ᕂ', 'ʉ', 'Ҹ', 'կ'],
      'V' : ['Ʋ', 'Մ', 'ט', 'Ꮙ', 'Ꮴ', 'ᐍ', 'ᕓ', '▼', '▽', '✔'],
      'v' : ['Ʋ', 'Ն', 'ס', '٧', '√'],
      'W' : ['Щ', 'Ѡ', 'Ѿ', 'ש', 'ฟ', 'ᙧ'],
      'w' : ['Ɯ', 'ʬ', 'ա', 'ผ'],
      'X' : ['χ', 'ϗ', 'Ж', 'Ԕ', 'Ⴟ', 'ᚕ', '✖'],
      'x' : ['×', 'ϗ', 'փ', 'ჯ', '✘'],
      'Y' : ['¥', 'Ɣ', 'Ⴤ'],
      'y' : ['ƴ', 'Ψ', 'ע', 'ʮ', 'ɥ'],
      'Z' : ['Ȥ', 'ʑ', 'Ż'],
      'z' : ['ƻ', 'Հ', 'շ' ],
      '\'':  ['ᷓ', '᷁', '΅', '῁', '⁗', '▝', '◜', '❜', '˚'],
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
      '\\':  ['⋱'],
      'misc' : [ 'ᾟ', '░', '▒', '▢', '▲', '△', '▶', '▷', '▼', '▽', '◀', '◁', '➔', '➜', '⟁', '✞', '✝', '✟', '‡', '͎']
    }

})( jQuery );