$(document).ready(function() {
  $("#new-tweet-text").on("input", onInput);
});

// Displays the number of remaining tweet characters
const onInput = function() {
  const text = $(this).val();
  const remaining = MAX_TWEET_LENGTH - text.length;
  const output = $(this).next().find("output");
  output.toggleClass("error", remaining < 0);
  output.html(remaining);
};