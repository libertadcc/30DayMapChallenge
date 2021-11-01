import Map from "https://js.arcgis.com/4.21/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.21/@arcgis/core/views/MapView.js";
import FeatureLayer from "https://js.arcgis.com/4.21/@arcgis/core/layers/FeatureLayer.js";
import esriConfig from 'https://js.arcgis.com/4.21/@arcgis/core/config.js';
import Legend from "https://js.arcgis.com/4.20/@arcgis/core/widgets/Legend.js";



esriConfig.apiKey = "AAPK910bc52162d04535b4b2e399d655b842-B8-L-B-bSHMrLN2KVLmjffN-wrL_S3hXWvzpGoUceNidwHU5YxKxYF9dcKDp9xH";


const map = new Map({
    basemap: "arcgis-light-gray", //Basemap layer service
  
});

// 2D
const view = new MapView({
    map: map,
    center: [-2.470, 41.744], // Longitude, latitude
    zoom: 6, // Zoom level
    container: "viewDiv" // Div element
});

const hospitalPopup = {
    "title": "{Nombre}",
    "content": "En {Municipios}"
}

const hospitalLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/Hospitales/FeatureServer/0",
    popupTemplate: hospitalPopup
});

const hospitalRenderer = {
    type: "unique-value",
    field: "CAPITAL",
    uniqueValueInfos: [{
        value: "S",
        symbol: {
            type: "picture-marker",
            url: "salud.png",
            color: "red",
            size: 10
        },
        label: "En capital de provincia"
    }, {
        value: "N",
        symbol: {
            type: "picture-marker",
            url: "latido-del-corazon.png",
            color: "red",
            size: 10
        },
        label: "Fuera de la capital de provincia"
    }]
}

hospitalLayer.renderer = hospitalRenderer;


const provinciasLayer = new FeatureLayer("https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/Prov/FeatureServer/0/");

const provinciasRenderer = {
    type: "simple",
    symbol: {
        type: "simple-fill",
        color: "transparent",
        outline: {
            width: 1.5,
            color: [223, 168, 69, 1]
        }

    }
};

provinciasLayer.renderer = provinciasRenderer;

view.when(() => {
    const legend = new Legend({
        view: view,
        layerInfos: [{
            layer: hospitalLayer,
            title: "Hospitales en España"
        }]
    });
    
    view.ui.add(legend, 'bottom-right');
});

map.addMany([provinciasLayer, hospitalLayer]);

