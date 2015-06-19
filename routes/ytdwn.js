var express = require('express');
var router = express.Router();
var ytdl = require('youtube-dl');
router.get('/:url', function(req, res) {
    var data = {};
    var videoData = [];
    url = req.params.url;
    url = 'https://www.youtube.com/watch?v=' + url;
    console.log(url);
    ytdl.getInfo(url, '', function(err, info) {
        try {
            if (err) {
                data = {
                    status: 404,
                    msg: 'Sorry video not available'
                }
            } else {
                for (var i = 0; i < info.formats.length; i++) {
                    if (info.formats[i].format_note !== "DASH video"&&info.formats[i].ext !== "webm") {
                        var dwnurl = info.formats[i].url;
                        var dwnext = info.formats[i].ext;
                        var dwnquality = info.formats[i].height;
                        dwnurl = dwnurl + '&title=' + info.title.replace(/"/g, '');
                        if (dwnext == 'm4a') {
                            dwnurl = dwnurl + '&ext=mp3';
                            dwnext = 'mp3';
                            dwnquality = info.formats[i].abr;
                        }
                        videoData.push({
                            ext: dwnext,
                            quality: dwnquality,
                            url: dwnurl
                        });
                    }
                }
                data.status = 200;
                data.data = videoData;
            }
            res.send(data);
        } catch (e) {
            res.send({
                status: 404,
                msg: 'Oops! something went wrong, please try later' + e
            });
        }
    });
});
module.exports = router;