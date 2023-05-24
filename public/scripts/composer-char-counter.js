$(document).ready(function () {
  $('#tweet-text').on('input', function () {
    // find the counter within the same form as the input
    const counter = $(this).closest('form').find('.counter');

    // calculate remaining characters
    const remaining = 140 - $(this).val().length;

    // update counter text
    counter.text(remaining);

    if (remaining < 0) {
      // if character count exceeded, add class to change color to red
      counter.addClass('count-exceeded');
    } else {
      // if character count is okay, remove class to make color normal
      counter.removeClass('count-exceeded');
    }
  });
});
