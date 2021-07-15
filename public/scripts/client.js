/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Prevent XSS
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
      <p>${escape(tweet.content.text)}</p>
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

const createErrorMsg = function(msg) {
  const $error = $(`
    <div class="error error-msg">
      <i class="fa fa-times-circle"></i>
      ${msg}
    </div>
  `);
  return $error;
};

$(document).ready(function() {
  $('.new-tweet').hide();

  loadTweets();

  $("form").submit(function(event) {
    event.preventDefault();
    const formData = $(this).serialize();
    const url = $(this).attr("action");
    const tweetText = formData.replace('text=', '');

    $('.error-msg').hide();
    if (tweetText === "") {
      const msg = 'Please enter a tweet message.';
      $(createErrorMsg(msg)).prependTo('.new-tweet').hide().slideDown();
    } else if (tweetText.length > 140) {
      const msg = 'Please enter a tweet message between 1-140 characters.';
      $(createErrorMsg(msg)).prependTo('.new-tweet').hide().slideDown();
    } else {
      $(this).get(0).reset();
      $.post(url, formData)
      .then(() => loadNewTweet());
    }
  });

  $('.compose').click(function(event) {
    const $newTweet = $('.new-tweet');
    if ($newTweet.is(':visible')) {
      $newTweet.slideUp();
    } else {
      $newTweet.slideDown();
      $('#new-tweet-text').focus();
    }
  });

  $('.backtotop').css({'display': 'none'});
  const offset = 200;
  const duration = 150;
  $(window).scroll(function() {
    if ($(this).scrollTop() > offset) {
        $('.backtotop').fadeIn(duration);
        $('.compose').fadeOut(duration);
    } else {
        $('.backtotop').fadeOut(duration);
        $('.compose').fadeIn(duration);
      }
    });
    
    $('.backtotop').click(function(event) {
      event.preventDefault();
      $('html, body').animate({scrollTop: 0}, duration);
      $('.new-tweet').show();
      $('#new-tweet-text').focus();
      return false;
    });
});
