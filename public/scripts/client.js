$(document).ready(function () {
  // Function to escape potentially unsafe characters
  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // error message
  const errorElement = $('#error-message');

  // The createTweetElement function now uses the timeago library to format the date.
  const createTweetElement = function (tweet) {
    const { content: { text }, created_at, user: { name, avatars, handle } } = tweet;
    const tweetElement = `<article class="tweet" data-tweet-id="${tweet.id}">
      <header class="tweet-header">
        <div class="user-profile">
          <img class="user-icon" src=${escape(avatars)}></img>
          <p class="user-name">${escape(name)}</p>
        </div>
        <div>
          <p class="user-handle">${escape(handle)}</p>
        </div>
      </header>
      <div class="tweet-text">${escape(text)}</div>
      <footer class="tweet-footer">
        <span class="tweet-date">${timeago.format(created_at)}</span>
        <div class="tweet-response">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>`;
    return tweetElement;
  };

  // Function to load tweets
  const loadTweets = function () {
    $.getJSON('/tweets', function (tweets) {
      $('#tweets-container').empty();
      tweets.forEach((tweet) => {
        const $tweet = createTweetElement(tweet);
        $('#tweets-container').prepend($tweet);
      });
    });
  };

  // Initial loading of tweets
  loadTweets();

  // Form submit handler
  $('form').on('submit', function (event) {
    event.preventDefault();

    errorElement.slideUp();

    const textArea = $('#tweet-text');
    const tweetLength = textArea.val().length;

    let errorMessage;

    if (tweetLength === 0) {
      errorMessage = '<i class="fa-solid fa-triangle-exclamation" style="color: #ff0000;"></i>' +
          '<span>Your tweet is empty. Please write something.</span>' +
          '<i class="fa-solid fa-triangle-exclamation" style="color: #ff0000;"></i>';
    } else if (tweetLength > 140) {
      errorMessage = '<i class="fa-solid fa-triangle-exclamation" style="color: #ff0000;"></i>' +
          '<span>Your tweet is too long. Please make sure it is less than 140 characters.</span>' +
          '<i class="fa-solid fa-triangle-exclamation" style="color: #ff0000;"></i>';
    }

    if (errorMessage) {
      errorElement.html(errorMessage).slideDown().delay(2000).slideUp();
      return;
    }
    
    $.post('/tweets', $(this).serialize(), function () {
      // Clear the textarea and reset the counter
      textArea.val('');
      $('.counter').text('140').removeClass('count-exceeded');
      loadTweets(); // refresh tweets on successful post
    }).fail(function (err) {
      console.error('Error occurred during data submission: ', err);
    });
  });
});
