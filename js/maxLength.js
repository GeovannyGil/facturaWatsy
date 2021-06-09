/*
By http://jquery-manual.blogspot.com Copyright � 2013
*/
$.fn.maxLength = function (limit, options) {

  var defaults = {
    showNumber: "",
    revert: true
  }

  var options = $.extend(defaults, options);
  element = this;

  function event(e) {
    element.on(e, function () {
      chars = $(this).val().length;
      if (defaults.showNumber != "") {
        defaults.revert == true ? $(defaults.showNumber).text(limit - chars) : $(defaults.showNumber).text(chars);
      }

      if (chars >= limit) {
        $(this).val($(this).val().substr(0, limit - 1));
      }
    });
  }

  event("keypress");
  event("keydown");
  event("keyup");
  event("focus");

};