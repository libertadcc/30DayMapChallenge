import Map from "https://js.arcgis.com/4.21/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.21/@arcgis/core/views/MapView.js";
import FeatureLayer from "https://js.arcgis.com/4.21/@arcgis/core/layers/FeatureLayer.js";
import WFSLayer from "https://js.arcgis.com/4.21/@arcgis/core/layers/WFSLayer.js";
import esriConfig from 'https://js.arcgis.com/4.21/@arcgis/core/config.js';
import Legend from "https://js.arcgis.com/4.20/@arcgis/core/widgets/Legend.js";


esriConfig.apiKey = "AAPK910bc52162d04535b4b2e399d655b842-B8-L-B-bSHMrLN2KVLmjffN-wrL_S3hXWvzpGoUceNidwHU5YxKxYF9dcKDp9xH";


const map = new Map({
    basemap: "arcgis-light-gray", //Basemap layer service

});

// 2D
const view = new MapView({
    map: map,
    center: [-3.676903, 40.401582], // Longitude, latitude
    zoom: 6, // Zoom level
    container: "viewDiv" // Div element
});

const rivers = new FeatureLayer({
    url: "https://services3.arcgis.com/FrTO2wfz5ckEyZcp/arcgis/rest/services/rios_espa%C3%B1a_completo/FeatureServer/0",
    popupTemplate: {
        title: "Río {NOM_CAUCE}",
        content: "Cauce de {LONG_CAUCE} m"
    }
});

const masasAguaLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/masas_de_agua_superficial_poligono/FeatureServer/0",
    popupTemplate: {
        title: "{MASA_Nom}",
        content: "Masa de agua: {NATURLDAD}"
    }
});

const waterRenderer = {
    type: 'unique-value',
    defaultSymbol: {
        type: 'simple-fill',
        color: '#04668D',
        outline: {
            color: [0,0,0,0]
        }
    },
    field: 'NATURLDAD',
    uniqueValueInfos: [
        
        {
            value: 'Natural',
            symbol: {
                type: 'simple-fill',
                color: "#3B6CA7",
                outline: {
                    color: [0,0,0,0]
                }
            }
        },
        {
            value: 'Muy modificada',
            symbol: {
                type: 'simple-fill',
                color: '#726EB8',
                outline: {
                    color: [0,0,0,0]
                }
            }
        },
        {
            value: 'Artificial',
            symbol: {
                type: 'simple-fill',
                color: "#A86BB9",
                outline: {
                    color: [0,0,0,0]
                }
            }
        }

    ]
};

masasAguaLayer.renderer= waterRenderer;


map.addMany([rivers,masasAguaLayer]);

view.when(() => {
    const legend = new Legend({
        view: view,
        layerInfos: [
            {
                layer: rivers,
                title: "Ríos de España"
            },{
                layer: masasAguaLayer,
                title: "Naturalidad de las masas de agua superficiales"
            }
        ]
    });

    view.ui.add(legend, 'bottom-right');
});


