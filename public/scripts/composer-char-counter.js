
$(document).ready(function() {
  $( "#tweet-text" ).on("input", function(event) {
    let $charsLeft = 140 - $( this ).val().length;
    $counter = $( this ).parentsUntil( ".new-tweet" ).find('.counter');
    $counter.text($charsLeft);
    if ($charsLeft < 0) {
      return $counter.addClass('over-limit');
    }
    $counter.removeClass('over-limit');
  });

});