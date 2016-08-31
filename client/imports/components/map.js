import React from "react";

class Map extends React.Component {

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

  updateRegionId(e) {
    this.props.updateFilter(e.target.feature.properties.parent_id);
    this.state.map.fitBounds(e.target.getBounds());
  }

  onEachFeature(feature, layer) {
    layer.on({
      click: this.updateRegionId.bind(this)
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
      
    this.state.currentLayer = L.geoJson(this.props.resources.data, {
      style: this.getHeat,
      onEachFeature: this.onEachFeature.bind(this)
    });
    this.state.map.addLayer(this.state.currentLayer);
  }

  componentDidUpdate() {  
    console.log(this.props.resources);

    this.state.map.removeLayer(this.state.currentLayer);
    this.state.currentLayer = L.geoJson(this.props.resources.data, {
      style: this.getHeat,
      onEachFeature: this.onEachFeature.bind(this)
    });
    this.state.map.addLayer(this.state.currentLayer);
  }

  render() {
    console.log(this.props.resources);
    const styles = {
      map: {
        height: "400px"
      }
    }
    return (
      <div id="map" style={styles.map}>
      </div>
    )
  }
}

Map.propTypes = {
  resources: React.PropTypes.array,
  updateFilter: React.PropTypes.func
};

export default Map;