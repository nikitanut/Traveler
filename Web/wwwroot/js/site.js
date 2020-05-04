function onLoad() {
    $.ajax({
        url: "js/data.json"
    }).done(function (data) {
        for (var i in data) {
            $("#details").append(HtmlGenerator.getDetailDiv(data[i]));
        }
    });
}

var myMap;
var objectManager;

ymaps.ready(function () {
    myMap = new ymaps.Map('map', {
        center: [54.4300833, 160.1421667],
        zoom: 7
    }, {
        searchControlProvider: 'yandex#search'
    }),
        objectManager = new ymaps.ObjectManager({
            gridSize: 32,
            clusterDisableClickZoom: true
        });


    objectManager.objects.options.set('preset', 'islands#greenDotIcon');

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
                }
            });
        }

        objectManager.add(objectManagerData);
    });
});

function centerMap(x, y) {
    var objects = objectManager.objects._objectsById;
    for (var i in objects) {
        if (objects[i].geometry.coordinates[0] == x && objects[i].geometry.coordinates[1] == y) {
            objectManager.objects.balloon.open(i)
            break;
        }
    }
}