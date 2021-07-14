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
    $('.tweets-feed').prepend($tweet);
  }
};

const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
  .then(res => renderTweets(res));
};

const loadNewTweet = function() {
  $.ajax('/tweets', { method: 'GET' })
  .then(res => $('.tweets-feed').prepend(createTweetElement(res[res.length-1])));
};

$(document).ready(function() {
  loadTweets();

  $("form").submit(function(event) {
    event.preventDefault();
    const formData = $(this).serialize();
    const url = $(this).attr("action");
    const tweetText = formData.replace('text=', '');

    if (tweetText === "") {
      alert('Please enter a tweet message.')
    } else if (tweetText.length > 140) {
      alert('Please enter a tweet message between 1-140 characters.')
    } else {
      $.post(url, formData)
      .then(() => loadNewTweet());
    }
  });
});
