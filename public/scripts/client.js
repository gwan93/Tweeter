/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


const createTweetElement = function(tweetObj) {
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
        <h3 class="tweet-text">${tweetObj.content.text}</h3>
        <div class="tweet-details">
          <div class="tweet-age">
            <h6>${tweetObj.created_at}</h6>
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
  for (let tweetData of data) {
    const $tweet = createTweetElement(tweetData);
  $(".tweet-container").append($tweet);
  }
  
};





$(document).ready(function() {
  renderTweets();
})