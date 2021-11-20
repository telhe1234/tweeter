/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

const renderTweets = function(tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('#tweets-container').prepend($tweet);
  }
};
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
const createTweetElement = (tweetData) => {
  const $tweet = $(`
    <article class="tweet">
      <header>
        <div class="user-logo-and-name">
          <div>
            <img src="${tweetData.user.avatars}" alt="">
          </div>
          <span>${tweetData.user.name}</span>
        </div>
        <span class="handle">${tweetData.user.handle}</span>
      </header>
      <body>
        <div class="tweet-show-text">${escape(tweetData.content.text)}</div>
      </body>
      <footer>
        <hr>
        <div class="time-and-icons">
          <span>${timeago.format(tweetData.created_at)}</span>
          <div class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet "></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </div>
      </footer>
    </article>
  `);
  return $tweet;
};

const loadtweets = () => {
  $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      // console.log('Success: ', data);
      // console.log(typeof data);
      // const dataArray = $.parseJSON($(data));
      // console.log(data);
      renderTweets($(data));
    });
}
const generateError = (message) => {
  return $("#input-error")
  .html(`<i class='fa fa-warning' style='color:red'></i> ${message} <i class='fa fa-warning' style='color:red'>`)
  .slideDown('fast');
}
// Test / driver code (temporary)
$(() => {
  loadtweets();
  // renderTweets(data);
  $( "#tweet-form" ).submit(function( event ) {
    event.preventDefault();
    $("#input-error").slideUp('fast');
    // const $userInput = $("#tweet-text").val();
    if ($("#tweet-text").val().length > 140) {
      return generateError('Too long. Please respect our limit of 40 chars!');
    }
    if ($("#tweet-text").val().length === 0) {
      return generateError('Your post has nothing in it!');
    }
    const val = $( this ).serialize();
    const url = $(this).attr( "action" );
    $.post(url, val).then(function () {
      // console.log('success!');
      $("#tweet-text").val('');
      $('.counter').val(140);
      $('.counter').removeClass('over-limit');
      $('#tweets-container').empty();
      loadtweets();
    })
  });
});

