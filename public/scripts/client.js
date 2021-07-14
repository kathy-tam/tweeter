/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweetData) {
  const $tweet = $(`
  <article class="tweet">
    <header>
      <div>
        <img class="avatar" src=${tweetData.user.avatars}>
        <p>${tweetData.user.name}</p>
      </div>
      <b class="username">${tweetData.user.handle}</b>
    </header>
    <div class="tweet-text">
      <p>${tweetData.content.text}</p>
    </div>
    <footer>
      <p>${tweetData.created_at}</p>
      <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`);
  return $tweet;
};

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
$(document).ready(function() {
  console.log($tweet); // to see what it looks like
  $('.tweets-feed').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});

