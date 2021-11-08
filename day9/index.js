import Map from "https://js.arcgis.com/4.21/@arcgis/core/Map.js";
import Basemap from "https://js.arcgis.com/4.21/@arcgis/core/Basemap.js";
import MapView from "https://js.arcgis.com/4.21/@arcgis/core/views/MapView.js";
import VectorTileLayer from "https://js.arcgis.com/4.21/@arcgis/core/layers/VectorTileLayer.js";
import esriConfig from 'https://js.arcgis.com/4.21/@arcgis/core/config.js';

esriConfig.apiKey = "AAPK910bc52162d04535b4b2e399d655b842-B8-L-B-bSHMrLN2KVLmjffN-wrL_S3hXWvzpGoUceNidwHU5YxKxYF9dcKDp9xH";

const vectorTileLayer = new VectorTileLayer({
    portalItem: {
        id: "5d4bc370657a47b69c9622d01a2a2973" // Forest and Parks Canvas
    },
    opacity: .75
});

const basemap = new Basemap({
    baseLayers: [
        vectorTileLayer
    ]
});

const map = new Map({
    basemap: basemap

});

const view = new MapView({
    map: map,
    center: [-4.782677, 37.8723], // Longitude, latitude
    zoom: 14, // Zoom level
    container: "viewDiv" // Div element
});




