import Map from "https://js.arcgis.com/4.21/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.21/@arcgis/core/views/MapView.js";
import FeatureLayer from "https://js.arcgis.com/4.21/@arcgis/core/layers/FeatureLayer.js";
import esriConfig from 'https://js.arcgis.com/4.21/@arcgis/core/config.js';
import Legend from "https://js.arcgis.com/4.20/@arcgis/core/widgets/Legend.js";


esriConfig.apiKey = "AAPK910bc52162d04535b4b2e399d655b842-B8-L-B-bSHMrLN2KVLmjffN-wrL_S3hXWvzpGoUceNidwHU5YxKxYF9dcKDp9xH";


const map = new Map({
    basemap: "osm-light-gray", //Basemap layer service

});

// 2D
const view = new MapView({
    map: map,
    center: [-3.676903, 40.401582], // Longitude, latitude
    zoom: 6, // Zoom level
    container: "viewDiv" // Div element
});



const zepaLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/ZonasZepaEspa%C3%B1a/FeatureServer/0",
    popupTemplate:{
        title: '{zepa_name}',
        content: 'Situada en {ccaa_n_zep} tiene una superficie de {superficie} metros cuadrados.'
    }
});

const zepaRenderer = {
    type: "simple",
    symbol: { 
        type: "simple-fill", 
        color: [146, 222, 152, 0.86]
    }
}

zepaLayer.renderer = zepaRenderer;


view.when(() => {
    const legend = new Legend({
        view: view,
        layerInfos: [{
            layer: zepaLayer,
            title: "Zonas ZEPA en España"
        }]
    });

    view.ui.add(legend, 'bottom-right');
});

map.add(zepaLayer);

