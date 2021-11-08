import Map from "https://js.arcgis.com/4.21/@arcgis/core/Map.js";
import Basemap from "https://js.arcgis.com/4.21/@arcgis/core/Basemap.js";
import SceneView from "https://js.arcgis.com/4.21/@arcgis/core/views/SceneView.js";
import SceneLayer from "https://js.arcgis.com/4.21/@arcgis/core/layers/SceneLayer.js";
import esriConfig from 'https://js.arcgis.com/4.21/@arcgis/core/config.js';
import Legend from "https://js.arcgis.com/4.20/@arcgis/core/widgets/Legend.js";


esriConfig.apiKey = "AAPK910bc52162d04535b4b2e399d655b842-B8-L-B-bSHMrLN2KVLmjffN-wrL_S3hXWvzpGoUceNidwHU5YxKxYF9dcKDp9xH";


const map = new Map({
    basemap: "arcgis-topographic", //Basemap layer service
    ground: "world-elevation",
});

const sceneLayer = new SceneLayer({
    url: "https://tiles.arcgis.com/tiles/lnFkorfBb3ma2riJ/arcgis/rest/services/MadridCentro/SceneServer"
});

map.add(sceneLayer);

const view = new SceneView({
    map: map,
    container: "viewDiv", // Div element
    camera: {
        position: {
            x: -3.702592717937532,
            y: 40.41920844679523,
            z: 844 // meters
        },
        tilt: 54
    }
});
