import Map from "https://js.arcgis.com/4.21/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.21/@arcgis/core/views/MapView.js";
import FeatureLayer from "https://js.arcgis.com/4.21/@arcgis/core/layers/FeatureLayer.js";
import esriConfig from 'https://js.arcgis.com/4.21/@arcgis/core/config.js';
import Legend from "https://js.arcgis.com/4.20/@arcgis/core/widgets/Legend.js";



esriConfig.apiKey = "AAPK910bc52162d04535b4b2e399d655b842-B8-L-B-bSHMrLN2KVLmjffN-wrL_S3hXWvzpGoUceNidwHU5YxKxYF9dcKDp9xH";


const map = new Map({
    basemap: "arcgis-imagery", //Basemap layer service

});

// 2D
const view = new MapView({
    map: map,
    center: [-6.536644,39.985335], // Longitude, latitude
    zoom: 12, // Zoom level
    container: "viewDiv" // Div element
});

const landLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/TeselaEspana_WFL1/FeatureServer/0",
});


view.when(() => {
    const legend = new Legend({
        view: view,
        layerInfos: [{
            layer: landLayer,
            title: "Caracterización del territorio"
        }]
    });

    view.ui.add(legend, 'bottom-left');
});

map.addMany([landLayer]);

