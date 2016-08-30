import React, { Component, PropTypes } from 'react';
 
// Task component - represents a single todo item
export default class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  getHeat(feature) {
    var maxDensity = 20000;
    var density = Math.floor(255*(1-(feature.properties.population/feature.properties.area)/maxDensity));
    var heat = '#ff' + density.toString(16) + density.toString(16); 
    return {fillColor: heat, color: '#FF0000', weight: 1, opacity: 0.5}
  }

  updateCounty(e) {
    this.props.zoomToCounty(e.target.feature.properties.id);
    this.state.map.fitBounds(e.target.getBounds());
  }
 
  onEachCounty(feature, layer) {
    layer.on({
      click: this.updateCounty.bind(this),
    });
  }

  componentDidMount() {
    this.state.map = L.map('map', {
        center: [53, -5],
        zoom: 6
    });    
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'nqmivan.12id4bh0',
        accessToken: 'pk.eyJ1IjoibnFtaXZhbiIsImEiOiJjaXJsendoMHMwMDM3aGtuaGh2bWt5OXRvIn0.6iCk2i96NUucsyDlbnVtiA'
    }).addTo(this.state.map);
      
    this.state.currentLayer = L.geoJson(this.props.geojson, {
      style: this.getHeat,
      onEachFeature: this.onEachCounty.bind(this),
    });
    this.state.map.addLayer(this.state.currentLayer);
  }

  componentDidUpdate() {  

    this.state.map.removeLayer(this.state.currentLayer);
    this.state.currentLayer = L.geoJson(this.props.geojson, {
      style: this.getHeat,
      onEachFeature: this.onEachCounty.bind(this),

    });
    this.state.map.addLayer(this.state.currentLayer);
  }

  render() {
    return (
      <div id="map" style={{"height" : "400px"}}>
      </div>
    );
  }
}

Map.propTypes = {
  geojson: PropTypes.array.isRequired,
};