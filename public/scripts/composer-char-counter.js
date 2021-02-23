$(document).ready(function() {
  // $('#tweet-text').click(function() {
  //   console.log('clicked', this);
  // })

  // $('#tweet-text').blur(function() {
  //   console.log('blur', this);
  // })

  // $('#tweet-text').keydown(function() {
  //   console.log('keydown', this);
  // })

  // $('#tweet-text').keyup(function() {
  //   console.log('keyup', this);
  // })

  // $('#tweet-text').keypress(function() {
  //   console.log('keypress', this);
  // })

  // $("textarea").change(function(){
  //   console.log('change', this);
  // });

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