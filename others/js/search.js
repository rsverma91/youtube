var nextPageToken = "";
// Search for a specified string.
function search() {
    var q = $('#search-text').val();
    var request = $.get('https://www.googleapis.com/youtube/v3/search', {
        q: q,
        part: 'snippet',
        maxResults: 5,
        pageToken: nextPageToken,
        key: 'AIzaSyAokmDByZWfZhoL_foaRBqN_ve1usTS-AE'
    },
    function(response) {
        $('#search-container').html('');
        var resultItems = response.items;
        nextPageToken = response.nextPageToken;
        $.each(resultItems, function(index, item) {
            url = 'http://www.youtube.com/watch?v=' + item.id.videoId;
            vidTitle = '<div class="title">' + item.snippet.title + '</div>';
            vidPublishedAt = '<div class="publishedAt">Published on ' + (new Date(item.snippet.publishedAt)).toRBString() + '</div>';
            vidDescription = '<div class="description">' + item.snippet.description + '</div>';
            vidDetails = '<div class="details">' + vidTitle + vidPublishedAt + vidDescription + '</div>';
            vidThumburl = item.snippet.thumbnails.high.url;
            vidThumbimg = '<div class="thumb"><img src="' + vidThumburl + '" alt="No  Image Available."></div>';
            $('#search-container').append('<div class="vidResult" data-url="' + url + '">' + vidThumbimg + vidDetails + '</div>');
            if (index == resultItems.length - 1) {
                bindEvents();
            }
        });
    });
}
var bindEvents = function() {
    $('.vidResult').on('click', function() {
        var url = $(this).attr('data-url');
        url = url.replace("watch?v=", "embed/");
        $('#vid-player').attr('src', url);
        $('.vid-container').slideDown('fast', function() {});
        $('body, html').animate({
            scrollTop: 120
        }, '1000', 'swing')
    });
}