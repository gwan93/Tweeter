/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

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
          <h4>${tweetObj.user.handle}</h4>
        </div>
      </div>
      <footer class="tweet-footer">
        <h3 class="tweet-text">${escape(tweetObj.content.text)}</h3>
        <div class="tweet-details">
          <div class="tweet-age">
            <h6>${date.toUTCString()}</h6>
          </div>
          <div class="cross-share">
            <h6>O</h6>
            <h6>X</h6>
            <h6>O</h6>
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
  $.ajax('http://localhost:8080/tweets', { method: 'GET' })
  .then(function (data) {
    renderTweets(data);
  })
};

$(document).ready(function() {
  loadTweets();


  $("form").on("submit", function(event) {
    event.preventDefault();
    const textBody = $(this).serialize();

    if (!$('#tweet-text').val()) {
      $("#error-messages").html('Tweet body must contain text.');
      if ($("#error-messages").is(":hidden")) $("#error-messages").slideDown('slow')
    } else if ($('.counter').val() < 0) {
      $("#error-messages").html('Tweet is too long!');
      if ($("#error-messages").is(":hidden")) $("#error-messages").slideDown('slow')
    } else { 
      $("#error-messages").slideUp("slow", function() {
        $.post('http://localhost:8080/tweets/', textBody)
        $(".tweet-container").empty(); // removes all tweets from user page
        loadTweets(); // repopulates all tweets with new tweet included
      })
    }
  })

  $("#write-a-new-tweet").on("click", function(event) {
    event.preventDefault();

    if ($(".new-tweet").is(":hidden")) {
      $(".new-tweet").slideDown("slow", function() {
        $("textarea").focus();
      });
    } else {
      $(".new-tweet").slideUp("slow");
    }
  })
})