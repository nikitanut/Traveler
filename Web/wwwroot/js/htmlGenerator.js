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
        descriptionDiv.append(getVideoDescriptionDiv(detail));
        descriptionDiv.append(getLocationDiv(detail));
        return descriptionDiv;
    }

    function getVideoDescriptionDiv(detail) {
        var videoDescriptionDiv = $("<div>", { class: 'video-description' });
        var videoTimeCodeDiv = $("<div>", { class: 'video-timecode' });        
        var channelTitleDiv = $("<div>", { class: 'channel-title' }).text(detail.channelTitle);
        var videoTitleDiv = $("<div>", { class: 'video-title' }).text(detail.videoTitle);

        videoTimeCodeDiv.append($("<img>", { src: 'location-50.png' }));
        videoTimeCodeDiv.append(getLocationNode(detail));

        videoDescriptionDiv.append(videoTimeCodeDiv);
        videoDescriptionDiv.append(channelTitleDiv);
        videoDescriptionDiv.append(videoTitleDiv);

        return videoDescriptionDiv;
    }

    function getLocationDiv(detail) {
        var locationDiv = $("<div>", { class: 'location' });
        var videoLengthDiv = $("<div>", { class: 'video-length' });        
        videoLengthDiv.append($("<img>", { src: 'timer-50.png' }));
        videoLengthDiv.append(document.createTextNode(detail.videoLength));
        locationDiv.append(videoLengthDiv);
        return locationDiv;
    }

    function getLocationNode(detail) {
        return $("<div>", { class: 'video-location', onclick: 'centerMap(' + detail.coordinates + ')' }).text(detail.sight);
    }
}();

