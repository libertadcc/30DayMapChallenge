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
    center: [-8.551903,42.872281], // Longitude, latitude
    zoom: 8, // Zoom level
    container: "viewDiv" // Div element
});

const routesPopup = {
    "title": "{Camino}",
    "content": "{Name}"
}

const routesLayer = new FeatureLayer({
    url: "https://services6.arcgis.com/XFTrpsr90usgMpgH/ArcGIS/rest/services/Caminos_de_Santiago/FeatureServer/0",
    popupTemplate: routesPopup
});

const routesRenderer = {
    type: "unique-value",
    field: "CAMINO",
    defaultSymbol: {type: "simple-line"},
    uniqueValueInfos: [{
        value: "Camino Francés",
        symbol:{
            type: "simple-line",
            width: 1.5, 
            color: [156, 70, 222, 1]
        }
    },{
        value: "Camino Inglés",
        symbol: {
            type: "simple-line",
            width: 1.5,
            color: "pink"
        }
    },{
        value: "Camino Portugués",
        symbol: {
            type: "simple-line",
            width: 1.5,
            color: "red"
        }
    },{
        value: "Camino Portugués de la Costa",
        symbol: {
            type: "simple-line",
            width: 1.5,
            color: "blue"
        }
    },{
        value: "Camino Primitivo",
        symbol: {
            type: "simple-line",
            width: 1.5,
            color: "green"
        }
    },{
        value: "Camino de Fisterra y Muxía",
        symbol: {
            type: "simple-line",
            width: 1.5,
            color: "yellow"
        }
    },{
        value: "Camino de Invierno",
        symbol: {
            type: "simple-line",
            width: 1.5,
            color: "white"
        }
    },{
        value: "Camino del Norte",
        symbol: {
            type: "simple-line",
            width: 1.5,
            color: "orange"
        }
    },{
        value: "Vía de la Plata",
        symbol: {
            type: "simple-line",
            width: 1.5,
            color: "gray"
        }
    }]
}

routesLayer.renderer = routesRenderer;

view.when(() => {
    const legend = new Legend({
        view: view,
        layerInfos: [{
            layer: routesLayer,
            title: "Principales rutas"
        }]
    });
    
    view.ui.add(legend, 'bottom-right');
});

map.addMany([routesLayer]);

