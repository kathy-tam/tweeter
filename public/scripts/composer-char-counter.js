const MAX_TWEET_LENGTH = 140;

$(document).ready(function() {
  $("#tweet-text").on("input", onInput);
});

const onInput = function() {
  const text = $(this).val();
  const remaining = MAX_TWEET_LENGTH - text.length;
  const output = $(this).next().find("output");
  output.toggleClass("error", remaining < 0);
  output.html(remaining);
};