/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweet) {
  const dateCreated = timeago.format(tweet.created_at);
  const $tweet = $(`
  <article class="tweet">
    <header>
      <div>
        <img class="avatar" src=${tweet.user.avatars}>
        <p>${tweet.user.name}</p>
      </div>
      <b class="username">${tweet.user.handle}</b>
    </header>
    <div class="tweet-text">
      <p>${tweet.content.text}</p>
    </div>
    <footer>
      <p>${dateCreated}</p>
      <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`);
  return $tweet;
};

const renderTweets = function(tweets) {
  let $tweet;
  for(const tweet of tweets) {
    $tweet = createTweetElement(tweet);
    $('.tweets-feed').append($tweet);
  }
};

// Fake data taken from initial-tweets.json
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


// Test / driver code (temporary)
$(document).ready(function() {
  renderTweets(data);
  
  $("form").submit(function(event) {
    event.preventDefault();
    alert('Submit handler called');
  });
});

// $(function() {
//   const $button = $('#load-more-posts');
//   $button.on('click', function () {
//     console.log('Button clicked, performing ajax call...');
//     $.ajax('more-posts.html', { method: 'GET' })
//     .then(function (morePostsHtml) {
//       console.log('Success: ', morePostsHtml);
//       $button.replaceWith(morePostsHtml);
//     });
//   });
// });

