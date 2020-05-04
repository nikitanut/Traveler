if (typeof (HtmlGenerator) == 'undefined') {
    window.HtmlGenerator = new Object();
}

HtmlGenerator = function () {
    return {
        getDetailDiv: getDetailDiv
    };

    function getDetailDiv(detail) {
        var detailDiv = $("<div>", { class: 'detail' });
        detailDiv.append(getVideoDiv(detail));
        detailDiv.append(getDescriptionDiv(detail));
        detailDiv.append($("<div>", { class: 'line' }));
        return detailDiv;
    }

    function getVideoDiv(detail) {
        var videoDiv = $("<div>", { class: 'video' });
        var src = 'https://www.youtube.com/embed/' + detail.videoId + '?start=' + detail.videoTimeCode;
        videoDiv.append($("<iframe>", { width: 310, height: 181, src: src, frameborder: 0, allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture', allowfullscreen: true }));
        return videoDiv;
    }

    function getDescriptionDiv(detail) {
        var descriptionDiv = $("<div>", { class: 'description' });
        var videoDescriptionDiv = getVideoDescriptionDiv(detail);
        var locationDiv = getLocationDiv(detail);

        descriptionDiv.append(videoDescriptionDiv);
        descriptionDiv.append(locationDiv);

        return descriptionDiv;
    }

    function getVideoDescriptionDiv(detail) {
        var videoDescriptionDiv = $("<div>", { class: 'video-description' });
        var channelTitleDiv = $("<div>", { class: 'channel-title' }).text(detail.channelTitle);
        var videoTitleDiv = $("<div>", { class: 'video-title' }).text(detail.videoTitle);

        videoDescriptionDiv.append(channelTitleDiv);
        videoDescriptionDiv.append(videoTitleDiv);

        return videoDescriptionDiv;
    }

    function getLocationDiv(detail) {
        var locationDiv = $("<div>", { class: 'location' });
        var videoLengthDiv = $("<div>", { class: 'video-length' });
        var videoTimeCodeDiv = $("<div>", { class: 'video-timecode' });

        videoLengthDiv.append($("<img>", { src: 'timer-50.png' }));
        videoLengthDiv.append(document.createTextNode(detail.videoLength));
        videoTimeCodeDiv.append($("<img>", { src: 'location-50.png' }));
        videoTimeCodeDiv.append(getLocationNode(detail));

        locationDiv.append(videoLengthDiv);
        locationDiv.append(videoTimeCodeDiv);

        return locationDiv;
    }

    function getLocationNode(detail) {
        var locationStr = secondsToStr(detail.videoTimeCode) + ' - ' + detail.sight;
        return document.createTextNode(locationStr);
    }

    function secondsToStr(sec) {
        var sec_num = parseInt(sec, 10);
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }

        return hours != "00"
            ? hours + ':' + minutes + ':' + seconds
            : minutes + ':' + seconds;
    }
}();

