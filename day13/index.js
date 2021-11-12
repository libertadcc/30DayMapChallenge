import Map from "https://js.arcgis.com/4.21/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.21/@arcgis/core/views/MapView.js";
import FeatureLayer from "https://js.arcgis.com/4.21/@arcgis/core/layers/FeatureLayer.js";
import esriConfig from 'https://js.arcgis.com/4.21/@arcgis/core/config.js';
import Legend from "https://js.arcgis.com/4.20/@arcgis/core/widgets/Legend.js";



esriConfig.apiKey = "AAPK910bc52162d04535b4b2e399d655b842-B8-L-B-bSHMrLN2KVLmjffN-wrL_S3hXWvzpGoUceNidwHU5YxKxYF9dcKDp9xH";


const map = new Map({
    basemap: "arcgis-dark-gray", //Basemap layer service

});

// 2D
const view = new MapView({
    map: map,
    center: [-0.411766,39.495359], // Longitude, latitude
    zoom: 11, // Zoom level
    container: "viewDiv" // Div element
});

const popupContent = {
    "title": "{Nombre}",
};

const humedalesLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/InventarioZonasHumedas/FeatureServer/0/",
    popupTemplate: popupContent
});

const humedalesRenderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
        type: "simple-fill",
        outline: { color: [255, 255, 255, 0] },
        color: [21, 107, 209, 0.50]
    }
};

humedalesLayer.renderer = humedalesRenderer;

view.when(() => {
    const legend = new Legend({
        view: view,
        layerInfos: [{
            layer: humedalesLayer,
            title: "Inventario Zonas Húmedas"
        }]
    });

    view.ui.add(legend, 'bottom-right');
});

map.addMany([humedalesLayer]);

