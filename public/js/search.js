var nextPageToken = "";
var flag = 0;
$(window).scroll(function(e) {
    e.preventDefault();
    if (($('body').height() - $('body').scrollTop() <= '611') && flag == 1) {
        flag = 0;
        var q = $('#search-text').val();
        var request = $.get('https://www.googleapis.com/youtube/v3/search', {
            q: q,
            part: 'snippet',
            maxResults: 5,
            pageToken: nextPageToken,
            key: 'AIzaSyAokmDByZWfZhoL_foaRBqN_ve1usTS-AE'
        }, fetchVideo);
    }
});

// Search for a specified string.
function search() {
    $('#search-container').html('');
    var q = $('#search-text').val();
    var request = $.get('https://www.googleapis.com/youtube/v3/search', {
        q: q,
        part: 'snippet',
        maxResults: 5,
        key: 'AIzaSyAokmDByZWfZhoL_foaRBqN_ve1usTS-AE'
    }, fetchVideo);
}
var fetchVideo = function(response) {
    $('.vid-container').hide();
    var resultItems = response.items;
    nextPageToken = response.nextPageToken;
    $.each(resultItems, function(index, item) {
        url = 'https://www.youtube.com/watch?v=' + item.id.videoId;
        vidTitle = '<div class="title">' + item.snippet.title + '</div>';
        vidPublishedAt = '<div class="publishedAt">Published on ' + (new Date(item.snippet.publishedAt)).toRBString() + '</div>';
        vidDescription = '<div class="description">' + item.snippet.description + '</div>';
        vidDetails = '<div class="details">' + vidTitle + vidPublishedAt + vidDescription + '</div>';
        vidThumburl = item.snippet.thumbnails.medium.url;
        vidThumbimg = '<div class="thumb"><img src="' + vidThumburl + '" alt="No  Image Available."></div>';
        $('#search-container').append('<div class="vidResult" data-url="' + url + '">' + vidThumbimg + vidDetails + '</div>');
        if (index == resultItems.length - 1) {
            bindEvents();
        }
    });
    flag = 1;
    $('.gototop').show();
};
var bindEvents = function() {
    $('.vidResult').on('click', function() {
        that = this;
        $('.loader').show();
        $('.gototop').hide();
        $('#search-container').hide();
        $('.vid-container').hide();
        var url = $(this).attr('data-url');
        var vidid = getURLParam(url)
        url = url.replace("watch?v=", "embed/");
        $('#vid-player').attr('src', url);
        $.get('/dwn/' + vidid['v'], function(data) {
            $('.vid-container').slideDown('fast');
            $('body, html').animate({
                scrollTop: 120
            }, '1000', 'swing');
            $('.download-box').html('');
            if (data.status === 200) {
                $('.download-box').append('<span>Select and Download</span>');
                for (var i = 0; i < data.data.length; i++) {
                    $('.download-box').append('<div><a href="' + data.data[i].url + '" download>' + data.data[i].ext + '-' + data.data[i].quality + '</a>');
                }
            } else {
                $('.download-box').html('<div>' + data.msg + '</div>');
            }
            $('.loader').hide();
            $('#search-container').show();
            $('.gototop').show();
        });
    });
};
var getURLParam = function(url) {
    param = {};
    var paramPart = url.split('?')[1];
    if (paramPart) {
        var params = paramPart.split('&');
        for (var i = 0; i < params.length; i++) {
            var p = params[i].split('=');
            var key = p[0];
            p.splice(0, 1);
            var value = p.join('=');
            param[key] = decodeURIComponent(value);
        }
        return param;
    };
};
$('.gototop').on('click', function() {
    $('body, html').animate({
        scrollTop: 0
    }, '1000', 'swing');
});