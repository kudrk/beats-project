//maps

let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {
    center: [59.937197, 30.365578],
    zoom: 12,
    controls: []
  });
  let coords = [
    [59.958122, 30.300003],
    [59.920913, 30.314423],
    [59.911956, 30.503647],
    [59.928479, 30.371114],
  ],
    myCollection = new ymaps.GeoObjectCollection({}, {
      draggable: false,
      iconLayout: 'default#image',
      iconImageHref: './img/icons/marker.png',
      iconImageSize: [46, 57],
      iconImageOffset: [-35, -52]
    });

  for (let i = 0; i < coords.length; i++) {
    myCollection.add(new ymaps.Placemark(coords[i]));
  }

  myMap.geoObjects.add(myCollection);

  myMap.behaviors.disable('scrollZoom');
};

ymaps.ready(init);
