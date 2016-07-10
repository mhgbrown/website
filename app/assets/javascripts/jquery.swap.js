/**
 * Swap an element with another one
 * @author: Yannick Guinness
 * @version: 0.1
 *
 * @params {Object} element - object that has to be swapped
 * @return: {jQuery Object}
 *
 * @usage:
 *     $('.one').swap('.two');
 *
 * @license: MIT
 * @date: 2013/07/22
 **/
(function($, document, undefined) {

  $.fn.swap = function (elem) {
      elem = elem.jquery ? elem : $(elem);
      return this.each(function () {
          $(document.createTextNode('')).insertBefore(this).before(elem.before(this)).remove();
      });
  };

}($, document));
