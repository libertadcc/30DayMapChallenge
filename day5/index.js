
require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/BasemapToggle"
], (Map, MapView, BasemapToggle) => {

    const map = new Map({
        basemap: "osm"
    });

    // Create the MapView and reference the Map in the instance
    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-5.597570, 40.348041], // Longitude, latitude
        zoom: 19, // Zoom level
    });

    // 1 - Create the widget
    const toggle = new BasemapToggle({
        // 2 - Set properties
        view: view, // view that provides access to the map's 'topo-vector' basemap
        nextBasemap: "hybrid" // allows for toggling to the 'hybrid' basemap
    });

    view.ui.add(toggle, "top-right");
});