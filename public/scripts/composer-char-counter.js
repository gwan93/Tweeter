$(document).ready(function() {
  $('textarea').keyup(function() {
    const charCount = $(this).val().length;
    const counterEl = $(this).parent().find(".counter")
    counterEl.val(140 - charCount);
    if (charCount >= 0 && charCount < 140) {
      counterEl.removeClass("red-font");
    } else {
      counterEl.addClass("red-font");
    }
  })
});