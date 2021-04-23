// protect from cross-site scripting
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweetObj) {
  const date = new Date(tweetObj.created_at);
  const $tweet = $(`
    <article>
      <div class="tweet-header">
        <div class="user-details">
          <div><img src="${tweetObj.user.avatars}"></div>
          <h3>${tweetObj.user.name}</h3>
        </div>
        <div class="handle">
          <p>${tweetObj.user.handle}</h4>
        </div>
      </div>
      <footer class="tweet-footer">
        <h3 class="tweet-text">${escape(tweetObj.content.text)}</h3>
        <div class="tweet-details">
          <div class="tweet-age">
            <h6>${moment(tweetObj.created_at).fromNow()}</h6>
          </div>
          <div class="cross-share">
            <i class="material-icons">favorite_border</i>
            <i class="material-icons">share</i>
            <i class="material-icons">flag</i>
          </div>
        </div>
      </footer>
    </article>
  `);
  return $tweet;
};

const renderTweets = (tweetArr) => {
  for (let tweetData of tweetArr) {
    const $tweet = createTweetElement(tweetData);
    $(".tweet-container").prepend($tweet);
  }
};

const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET' })
    .then(function(data) {
      renderTweets(data);
    });
};

$(document).ready(function() {
  loadTweets();

  // form submit function and error slide down
  $("form").on("submit", function(event) {
    event.preventDefault();
    const textBody = $(this).serialize();
    const errorBox = $("#error-messages");

    if (!$('#tweet-text').val()) {
      errorBox.html('Tweet body must contain text.');
      if (errorBox.is(":hidden")) errorBox.slideDown('slow');
    } else if ($('.counter').val() < 0) {
      errorBox.html('Tweet is too long!');
      if (errorBox.is(":hidden")) errorBox.slideDown('slow');
    } else {
      errorBox.slideUp("slow", function() {
        $.post('/tweets/', textBody, function() {
          $("#tweet-text").val('');
          $("#counter").val(140).removeClass("red-font");
          $(".tweet-container").empty(); // removes all tweets from user page
          loadTweets(); // repopulates all tweets with new tweet included
        });
      })
    }
  });

  // slidedown to write a new tweet
  $("#write-a-new-tweet").on("click", function(event) {
    event.preventDefault();
    if ($(".new-tweet").is(":hidden")) {
      $(".new-tweet").slideDown("slow", function() {
        $("textarea").focus();
      });
    } else {
      $(".new-tweet").slideUp("slow");
    }
  });

  // return to top button functionality
  const btn = $("#return-button");
  $(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });

  btn.on('click', function(event) {
    event.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
    $(".new-tweet").slideDown("slow", function() {
      $("textarea").focus();
    });
  })
});