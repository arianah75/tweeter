/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    user: {
      name: 'Newton',
      avatars: 'https://i.imgur.com/73hZDYK.png',
      handle: '@SirIsaac',
    },
    content: {
      text: 'If I have seen further it is by standing on the shoulders of giants',
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: 'Descartes',
      avatars: 'https://i.imgur.com/nlhLi3I.png',
      handle: '@rd',
    },
    content: {
      text: 'Je pense , donc je suis',
    },
    created_at: 1461113959088,
  },
];

const createTweetElement = function (tweet) {
  const text = tweet.content.text;
  const date = tweet.created_at;
  const { name, avatars, handle } = tweet.user;

  const tweeElement = `<article class="tweet">
  <header class="tweet-header">
    <div class="user-profile">
      <img class="user-icon" src=${avatars}></img>
      <p class="user-name">${name}</p>
    </div>
    <div>
      <p class="user-handle">${handle}</p>
    </div>
  </header>
  <div class="tweet-text">${text}</div>
  <footer class="tweet-footer">
    <span class="tweet-date">${date}</span>
    <div class="tweet-response">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
</article>`;
  return tweeElement;
};

// const $tweet = createTweetElement(tweetData);

const renderTweets = (arrayOfTweets) =>
  arrayOfTweets.map((element) => createTweetElement(element));

const $tweets = renderTweets(data);

