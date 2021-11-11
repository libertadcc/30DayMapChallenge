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
    center: [-2.465694, 41.767866], // Longitude, latitude
    zoom: 7, // Zoom level
    container: "viewDiv" // Div element
});

const popupContent = {
    "title": "{Nombre}",
    "content": "{HabHa} habitantes/hectárea"
};

const populationLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/La_Espa%C3%B1a_despoblada/FeatureServer/0",
    popupTemplate: popupContent
});

// HabHa

const defaultSym = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    outline: { // autocasts as new SimpleLineSymbol()
        color: [128, 128, 128, 0.2],
        width: "0.5px",
        outline: { 
            color: [0, 0, 0, 0.05] 
        }
    }
};

const populationRenderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: defaultSym,
    visualVariables: [
        {
            type: "color",
            field: "HabHa",
            stops: [
                {
                    value: 1,
                    color: "#582c0e",
                    label: "<1",
                    outline: { 
                        color: [0, 0, 0, 0.05] 
                    } 
                },
                {
                    value: 6,
                    color: "#ffa200",
                    label: "> 6",
                    outline: { 
                        color: [0, 0, 0, 0.05] 
                    }
                }
            ]
        }
    ]
};


populationLayer.renderer = populationRenderer;

view.when(() => {
    const legend = new Legend({
        view: view,
        layerInfos: [{
            layer: populationLayer,
            title: "Habitantes por hectárea"
        }]
    });

    view.ui.add(legend, 'bottom-right');
});

map.addMany([populationLayer]);

