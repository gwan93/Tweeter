$(document).ready(function() {
  $('textarea').keyup(function() {
    const charCount = $(this).val().length;
    const counterEl = $(this).parent().find(".counter")
    counterEl.val(140 - charCount);
    if (charCount >= 0 && charCount < 140) {
      counterEl.css({"color": "#545149"});
    } else {
      counterEl.css({"color": "red"});
    }
  })
});