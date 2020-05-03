ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 9
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
        objectManager.add(data);
    });
});