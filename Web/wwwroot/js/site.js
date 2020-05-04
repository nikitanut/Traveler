function onLoad() {
    $.ajax({
        url: "js/data.json"
    }).done(function (data) {
        for (var i in data) {
            $("#details").append(HtmlGenerator.getDetailDiv(data[i]));
        }
    });
}

ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
        center: [64.043065, -16.175841],
        zoom: 7
    }, {
        searchControlProvider: 'yandex#search'
    }),
        myPlacemark = new ymaps.Placemark(myMap.getCenter()),
        objectManager = new ymaps.ObjectManager({
            clusterize: true,
            gridSize: 32,
            clusterDisableClickZoom: true
        });

    myPlacemark.events
        .add('mouseenter', function (e) {
            e.get('target').options.set('preset', 'islands#greenIcon');
        })
        .add('mouseleave', function (e) {
            e.get('target').options.unset('preset');
        });

    objectManager.objects.options.set('preset', 'islands#greenDotIcon');
    objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');

    //myMap.geoObjects.add(myPlacemark);
    myMap.geoObjects.add(objectManager);

    $.ajax({
        url: "js/data.json"
    }).done(function (data) {
        var objectManagerData = {
            type: "FeatureCollection",
            features: []
        };

        for (var i in data) {
            objectManagerData.features.push({
                type: "Feature",
                id: i,
                geometry: {
                    type: "Point",
                    coordinates: data[i].coordinates
                },
                properties: {
                    balloonContentBody: "<iframe width='310' height='181' src='https://www.youtube.com/embed/" + data[i].videoId + "?start=" + data[i].videoTimeCode + "' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>",
                    hintContent: data[i].sight,
                    clusterCaption: data[i].clusterCaption,
                    channelTitle: data[i].channelTitle,
                    videoTitle: data[i].videoTitle,
                    videoLength: data[i].videoLength,
                    sight: data[i].sight
                }
            });
        }

        objectManager.add(objectManagerData);
    });
});