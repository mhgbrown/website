(function ($){
	$.fn.witchifier = function(options){
		var options = $.extend({}, $.fn.witchifier.defaults, options);
		var DICTIONARY = $.fn.witchifier.DICTIONARY;
		var methods = {
			init: function(){
				methods.preheat();
				return this.each(function(){
					var self = $(this);

					self.keypress(function(event){
						methods.applyCharToTarget(self, event);
					}).keydown(function(event){
						self.setCaretAtEnd();
						methods.applySpecialToTarget(self, event);
					}).click(function(event){
						self.setCaretAtEnd();
					});
				});
			},

			// Prepare the dictionary for this witchifying session
			preheat: function(){
				var translation = this.translate("(");
				var index = DICTIONARY["("].indexOf(translation);
				options.dictionary[")"] = DICTIONARY[")"][index];
			},

			// Only allow the delete key
			applySpecialToTarget: function(source, event){
				var target = $(options.target), keyCode = event.which;

				if (this.modifierKeyPresent(event) || this.isArrowKey(keyCode)) {
					event.preventDefault();
					return;
				}

				switch(keyCode) {
					// Backspace
		            case 8:
		                var text = target.text();

		                if (text.length){
		                    target.text(text.substring(0, text.length - 1));
		                }
		                break;
		            default:
						if(!this.inCharRange(keyCode)){
							event.preventDefault();
						}
		                break;
		        }
			},

			// Translate the input character, if valid, and write it
			// to the target.
			applyCharToTarget: function(source, event){
				var target = $(options.target),
				keyCode = event.which,
				candidate,
				translation;

			    if (this.inCharRange(keyCode)){
					source.setCaretAtEnd();

					candidate = String.fromCharCode(keyCode);
					translation = this.translate(candidate);

			        target.text(target.text() + translation);
			    }
			},

			// Translate the given value to a random entry in the DICTIONARY.
			// Save the translation of the given value so that we be consistent.
			translate: function(value){
				var targetTranslations, randomIndex, translation;

				if(options.dictionary[value]){ return options.dictionary[value]; }

				targetTranslations = DICTIONARY[value];
				if(!targetTranslations){ return value; }

				randomIndex = Math.floor(Math.random() * targetTranslations.length);
				translation = targetTranslations[randomIndex];
				options.dictionary[value] = translation;

				return translation;
			},

			// Determine if the given key code is within the acceptable
			// range for translation
			inCharRange: function(keyCode){
				return (keyCode >= 32) && (keyCode <= 126) || (keyCode >= 186) && (keyCode <= 222);
			},

			// Determine if the given key code is an arrow key
			isArrowKey: function(keyCode){
				return [37, 38, 39, 40].indexOf(keyCode) !== -1;
			},

			// Determine if any modifier keys were present during the given
			// event.
			modifierKeyPresent: function(event){
				return event.altKey || event.ctrlKey || event.metaKey;
			}

		};

		return methods.init.apply(this, arguments)
	};

	$.fn.witchifier.defaults = {
		target: null,
		dictionary: {}
	};

	$.fn.witchifier.DICTIONARY = {
	    "A" : ["Æ", "Ą", "Ⱥ", "Ʌ", "Δ", "Ѧ", "Ꭿ", "Ꮜ", "Ꮞ", "4", "ᐑ", "ᐰ", "ᕔ", "ᗄ", "▲", "△"],
	    "a" : ["@", "ą", "ɐ", "ɒ", "ʌ", "٨", "⊼"],
	    "B" : ["ß", "Ɓ", "Ƀ", "ɮ", "Ѯ", "ਊ", "฿", "ᗿ", "ᙘ", "ẞ", "ℬ", "ɮ"],
	    "b" : ["Ƃ", "ƃ", "Ƅ", "ɞ", "ʪ", "Ђ", "Ⴊ", "Ꮡ", "ᒀ", "ᔎ", "ᔽ", "ᵬ"],
	    "C" : ["Ç", "Ɔ", "Ƈ", "ɔ", "ɕ", "Ꮸ", "ᑤ", "ᔍ", "ᙍ"],
	    "c" : ["¢", "ƈ", "ე", "ᓖ", "⊑", "⋐"],
	    "D" : ["Ð", "Ɗ", "ם", "Ⴇ", "ᐇ", "ᗍ"],
	    "d" : ["ð", "đ", "Ƌ", "ȡ", "ժ", "Ⴛ", "ᑼ", "⋑"],
	    "E" : ["£", "Ę", "Ǝ", "Ɛ", "Ƹ", "Ξ", "Є", "Ӛ", "੬", "ᓬ", "ᕮ", "⁅", "∄", "∋"],
	    "e" : ["Ə", "ƺ", "ə", "ɚ", "ξ", "⋳", "⋵", "€"],
	    "F" : ["Ƒ", "ि", "Ꭶ", "ᖶ"],
	    "f" : ["ƒ", "Բ", "Ꮈ", "ᵮ", "∮", "∱"],
	    "G" : ["Ɠ", "Ǥ", "Ԍ", "Ᏻ", "ᘑ"],
	    "g" : ["ɠ", "Ꮽ", "ᕥ", "ᘝ", "ɠ", "❡"],
	    "H" : ["Ħ", "Ƕ", "Ԣ", "મ", "ỻ"],
	    "h" : ["ƕ", "Ђ", "ᑋ", "ᖾ", "⁁", "ђ"],
	    "I" : ["Į", "ǁ", "ᔫ", "‡", "▍", "Ꮠ", "Ɨ"],
	    "i" : ["¡","¦", "ɨ", "ɻ", "ᓾ", "✝", "ℷ", "ї"],
	    "J" : ["Ɉ", "ل", "Ꮦ", "ᒏ", "ᒠ"],
	    "j" : ["ƾ", "ɉ", "ك", "Ꮰ", "ǰ"],
	    "K" : ["Ƙ", "ʞ", "Ҝ", "Ԗ"],
	    "k" : ["ƙ", "ƛ", "ɮ", "ʫ"],
	    "L" : ["Ĺ", "Ł", "Ƚ", "ᒸ"],
	    "l" : ["ł", "Լ", "Ꮭ", "⇂", "ɭ"],
	    "M" : ["ʍ", "ʭ", "ϻ", "Ѫ", "Ҧ", "ਆ", "ᓬ", "ᙨ", "Ɱ"],
	    "m" : ["Ɯ", "ɰ", "ɱ", "ѫ", "Պ", "տ", "ॡ", "ਲ", "♏", "♍"],
	    "N" : ["Ɲ", "Π", "И", "Ԉ", "א", "ᑍ", "∏"],
	    "n" : ["ŋ", "ƞ", "ȵ", "ԉ", "Ո", "ո", "Ꮬ", "ᕅ", "ᕣ", "ᘚ", "ᾖ", "ᴒ", "♑", "♌"],
	    "O" : ["Ø", "Ƣ", "ם", "Ꭴ", "ᗜ", "◉", "◌", "◎"],
	    "o" : ["¤", "°", "º", "ø", "ƣ", "ȣ", "ɷ", "Ջ", "ᓁ", "ᓊ", "ỽ", "◊", "❍", "ð", "♁"],
	    "P" : ["¶", "Þ", "Ԗ", "Ⴒ", "Ꭾ", "ᕈ", "▛", "℘"],
	    "p" : ["þ", "ƍ", "ȹ", "Թ", "ք", "Ꮔ", "ᑬ", "ᖀ", "ᵱ"],
	    "Q" : ["Ɋ", "Ҩ", "Ⴔ", "ᕋ", "▜"],
	    "q" : ["ƪ", "ƻ", "Զ", "Գ", "ᑵ", "ᙯ", "ɬ"],
	    "R" : ["Ʀ", "ʁ", "Я", "Ԅ", "ᖈ", "ℜ"],
	    "r" : ["ζ", "ґ", "ӷ", "ᒌ", "ŗ"],
	    "S" : ["$", "§", "Ƨ", "ϟ", "Տ", "Ֆ", "ᔓ"],
	    "s" : ["ƨ", "ʂ", "ٸ", "ᴤ"],
	    "T" : ["Ţ", "Ŧ", "Ƭ", "Ԏ", "Շ", "ד", "ौ", "ᚘ", "⟙", "╀"],
	    "t" : ["±", "ŧ", "ƫ", "ȶ", "ᚂ", "ᚋ", "ᵵ", "†", "✝", "✞", "ɬ", "┼", "†"],
	    "U" : ["Ȣ", "Ҵ", "Ԏ", "Ա", "ᕟ", "∐"],
	    "u" : ["µ", "ȣ", "ʊ", "Կ", "प", "ᕂ", "ʉ", "Ҹ", "կ"],
	    "V" : ["Ʋ", "Մ", "ט", "Ꮙ", "Ꮴ", "ᐍ", "ᕓ", "▼", "▽", "✔"],
	    "v" : ["Ʋ", "Ն", "ס", "٧", "√"],
	    "W" : ["Щ", "Ѡ", "Ѿ", "ש", "ฟ", "ᙧ"],
	    "w" : ["Ɯ", "ʬ", "ա", "ผ"],
	    "X" : ["χ", "ϗ", "Ж", "Ԕ", "Ⴟ", "ᚕ", "✖"],
	    "x" : ["×", "ϗ", "փ", "ჯ", "✘"],
	    "Y" : ["¥", "Ɣ", "Ⴤ"],
	    "y" : ["ƴ", "Ψ", "ע", "ʮ", "ɥ"],
	    "Z" : ["Ȥ", "ʑ", "Ż"],
	    "z" : ["ƻ", "Հ", "շ" ],
	    "'":  ["ᷓ", "᷁", "΅", "῁", "⁗", "▝", "◜", "❜", "˚"],
	    "." : ["⁂", "•", "᷏", "█", "■", "□", "◆", "◇", "●", "◬"],
	    "," : ["ι", "▗", "◞", "⟀"],
	    "!" : ["‽", "‼", "❣", "❢", "¡", "↯"],
	    "?" : ["‽", "⁇", "≟", "¿", "Ɂ", "ɂ", "ʖ"],
	    "(" : ["᚜", "⁌", "⋘", "◖", "◀", "◁", "❮", "❰", "❲", "⟦", "⟪"],
	    ")" : ["᚛", "⁍", "⋙", "◗", "▶", "▷", "❯", "❱", "❳", "⟧", "⟫"],
	    ":" : ["⁑", "⁝", "⁞", "▞", "▚","ː"],
	    "-" : ["⁓", "∹", "∺", "⊝", "➳", "➵", "⟺", "⟿"],
	    "_" : ["‿"],
	    "*" : ["⊛", "◦", "ᚕ", "✣", "✤", "✥", "✩", "✱", "ᢆ", "⁎", "⁕", "⁙", "※"],
	    "/" : ["⋰"],
	    "\\":  ["⋱"],
	    "misc" : [ "ᾟ", "░", "▒", "▢", "▲", "△", "▶", "▷", "▼", "▽", "◀", "◁", "➔", "➜", "⟁", "✞", "✝", "✟", "‡", "͎"]
  	}

})(jQuery);