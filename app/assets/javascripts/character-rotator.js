(function(window, document, undefined){

  var CharacterRotator = function(rootElement) {
    this.rootElement = rootElement;
  };

  CharacterRotator.prototype = {

    CLASS_ROTATED: 'rotated',

    REGEXP_ROTATED: new RegExp('\\brotated\\b'),

    REGEXP_SPACES: /^\s+$/,

    /**
     * Restore all rotated characters to their non-rotated selfs.
     * TODO restore whole tree
     */
    restore: function() {
      var rotations = this.rootElement.querySelectorAll('.' + this.CLASS_ROTATED),
        textContent = [].map.call(rotations, function(elem){ return elem.textContent }).join('');
      this.rootElement.innerHTML = textContent;
    },

    /**
     * Rotate *all* the characters within the HTML tree
     * rooted at the node specified during the construction of 
     * this CharacterRotator.
     */
    rotate: function() {
      var textNodes = this.getTextNodes(),
        self = this,
        i = textNodes.length,
        j,
        node,
        parent,
        tmpFrag,
        spans,
        span,
        spanRect;

      while( i-- ) {
        node = textNodes[i];
        parent = node.parentElement;

        if( this.REGEXP_ROTATED.test( parent.className ) ) {
          continue;
        }

        tmpFrag = document.createDocumentFragment();
        node.nodeValue.replace(/(.)/g, function( match ) {
          var tmpSpan = document.createElement('span');
          tmpSpan.className = self.CLASS_ROTATED;
          tmpSpan.setAttribute('style', 'display:inline;white-space:pre;');
          tmpSpan.innerHTML = match;
          tmpFrag.appendChild(tmpSpan);
        });

        parent.replaceChild(tmpFrag, node);
        spans = parent.getElementsByClassName(this.CLASS_ROTATED);
        j = spans.length;

        while( j-- ) {
          span = spans[j];
          spanRect = span.getBoundingClientRect();
          span.style.left = spanRect.left + 'px';
          span.style.top = spanRect.top + 'px';
        }
      }

      // make sure the spans are inline-block so we can apply transformations to them
      // TODO add css to document to do this
      spans = document.getElementsByClassName(this.CLASS_ROTATED);
      j = spans.length;
      while( j-- ) {
        span = spans[j];
        span.style.display = 'inline-block';
      }

      // apply random rotation
      j = spans.length;
      while( j-- ) {
        this.randomlyRotate( spans[j] );
      }
    },

    randomlyRotate: function(element) {
      var degrees = Math.ceil(Math.random() * 4) * 90,
        transform = 'rotate(' + degrees +'deg)',
        css = {},
        prop;

      css['transform'] = transform;
      css['mozTransform'] = transform;
      css['webkitTransform'] =  transform;
      
      for( prop in css ) {
        element.style[prop] = css[prop];
      }
    },

    /**
     * Retrieve all text nodes which are not
     * made of space characters.
     **/
    getTextNodes: function() {
      var walker = document.createTreeWalker(
          this.rootElement,
          NodeFilter.SHOW_TEXT,
          null,
          false
        ),
        node = walker.nextNode(),
        textNodes = [];

      while(node) {

        if( !this.REGEXP_SPACES.test( node.nodeValue ) ) {
          textNodes.push(node);
        }
          
        node = walker.nextNode();
      }

      return textNodes;
    }

  };

  window.CharacterRotator = CharacterRotator;

}(window, document));