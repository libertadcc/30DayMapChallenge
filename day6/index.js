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



const ccaaLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/YFraetVkEAF1lMag/arcgis/rest/services/Violencia_machista_2003_2021/FeatureServer/0",
    popupTemplate: {
        title: "Víctimas en {CCAA}",
        content: [
            {
                type: "text", // TextContentElement
                text: "<p style='text-align:center'>Entre los años 2003 y 2021 han sido asesinadas <b>{Total} mujeres</b> a manos de su pareja o expareja.</p>"
            },
            {
                // Column chart
                type: "media", // MediaContentElement
                mediaInfos: [
                    {
                        title: "",
                        type: "column-chart",
                        caption: "",
                        value: {
                            fields: ["F2003", "F2004", "F2005", "F2006", "F2007", "F2008", "F2009", "F2010", "F2011", "F2012", "F2013", "F2014", "F2015", "F2016", "F2017", "F2018", "F2019", "F2020", "F2021"],
                            normalizeField: null,
                        }
                    },
                    
                ]
            },
            {
                // Tabla
                type: "fields", // FieldsContentElement
                fieldInfos: [
                    {
                        fieldName: "F2003",
                        label: "2003"
                    },
                    {
                        fieldName: "F2004",
                        label: "2004"
                    },
                    {
                        fieldName: "F2005",
                        label: "2005"
                    },
                    {
                        fieldName: "F2006",
                        label: "2006"
                    },
                    {
                        fieldName: "F2007",
                        label: "2007"
                    },
                    {
                        fieldName: "F2008",
                        label: "2008"
                    },
                    {
                        fieldName: "F2009",
                        label: "2009"
                    },
                    {
                        fieldName: "F2010",
                        label: "2010"
                    },
                    {
                        fieldName: "F2011",
                        label: "2011"
                    },
                    {
                        fieldName: "F2012",
                        label: "2012"
                    },
                    {
                        fieldName: "F2013",
                        label: "2013"
                    },
                    {
                        fieldName: "F2014",
                        label: "2014"
                    },
                    {
                        fieldName: "F2015",
                        label: "2015"
                    },
                    {
                        fieldName: "F2016",
                        label: "2016"
                    },
                    {
                        fieldName: "F2017",
                        label: "2017"
                    },
                    {
                        fieldName: "F2018",
                        label: "2018"
                    },
                    {
                        fieldName: "F2019",
                        label: "2019"
                    },
                    {
                        fieldName: "F2020",
                        label: "2020"
                    },
                    {
                        fieldName: "F2021",
                        label: "2021"
                    },
                ]
            }
        ]
    },
    outFields: ["*"]

});


view.when(() => {
    const legend = new Legend({
        view: view,
        layerInfos: [{
            layer: ccaaLayer,
            title: "Víctimas de la violencia machista en España (2003-2021)"
        }]
    });

    view.ui.add(legend, 'bottom-right');
});

map.addMany([ccaaLayer]);

