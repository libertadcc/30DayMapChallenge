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
    center: [-2.465694,41.767866], // Longitude, latitude
    zoom: 10, // Zoom level
    container: "viewDiv" // Div element
});

const popupContent = {
    "title": "{Nombre}",
    "content": "Población total: {PAD_2C02}"
}

const populationLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/La_Espa%C3%B1a_despoblada/FeatureServer/0",
    popupTemplate: popupContent
});


const less100 = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: "#f7fcfc",
    style: "solid",
    outline: {
        width: 0.2,
        color: [0,0,0, 0.5]
    }
};

const less500 = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: "#e0ecf4",
    style: "solid",
    outline: {
        width: 0.2,
        color: [0,0,0, 0.5]
    }
};

const less1000 = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: "#bfd3e6",
    style: "solid",
    outline: {
        width: 0.2,
        color: [0,0,0, 0.5]
    }
};

const less10000 = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: "#9ebcda",
    style: "solid",
    outline: {
        width: 0.2,
        color: [0,0,0, 0.5]
    }
};
const less70000 = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: "#8c96c6",
    style: "solid",
    outline: {
        width: 0.2,
        color: [0,0,0, 0.5]
    }
};
const less100000 = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: "#8c6bb1",
    style: "solid",
    outline: {
        width: 0.2,
        color: [0,0,0, 0.5]
    }
};
const less500000 = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: "#88419d",
    style: "solid",
    outline: {
        width: 0.2,
        color: [0,0,0, 0.5]
    }
};
const more500000 = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: "#4d004b",
    style: "solid",
    outline: {
        width: 0.2,
        color: [0,0,0, 0.5]
    }
};

const renderer = {
    type: "class-breaks",
    field: "PAD_2C02",
    defaultSymbol: {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: "black",
        style: "backward-diagonal",
        outline: {
            width: 0.5,
            color: [50, 50, 50, 0.6]
        }
    },
    defaulLabel: "Sin datos",
    classBreakInfos: [
        {
            minValue: 0,
            maxValue: 100,
            symbol: less100,
            label: "De 0 a 100 habitantes"
        },
        {
            minValue: 100,
            maxValue: 500,
            symbol: less500,
            label: "De 100 a 500 habitantes"
        },
        {
            minValue: 500,
            maxValue: 1000,
            symbol: less1000,
            label: "De 500 a 1.000 habitantes"
        },
        {
            minValue: 1000,
            maxValue: 10000,
            symbol: less10000,
            label: "De 1.000 a 10.000 habitantes"
        },
        {
            minValue: 10000,
            maxValue: 70000,
            symbol: less70000,
            label: "De 10.000 a 70.000 habitantes"
        },
        {
            minValue: 70000,
            maxValue: 100000,
            symbol: less100000,
            label: "De 70.000 a 100.000 habitantes"
        },{
            minValue: 100000,
            maxValue: 500000,
            symbol: less500000,
            label: "Entre 100.000 y 500.000 habitantes"
        },{
            minValue: 500000,
            maxValue: 9999999999999,
            symbol: more500000,
            label: "Más de 500.000 habitantes"
        }
    ]
};

populationLayer.renderer = renderer;

view.when(() => {
    const legend = new Legend({
        view: view,
        layerInfos: [{
            layer: populationLayer,
            title: "Número de habitantes"
        }]
    });

    view.ui.add(legend, 'bottom-right');
});

map.addMany([populationLayer]);

