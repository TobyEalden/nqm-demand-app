import React from "react";

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  getHeat(feature) {

    return {color: '#FF0000', weight: 1, opacity: 0.5}
  }

  updateRegionId(e) {
    //this.props.updateRegion("e.target.feature.properties.parent_id");
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
      
    this.state.currentLayer = L.geoJson(this.props.geoData, {
      style: this.getHeat,
      onEachFeature: this.onEachFeature.bind(this)
    });
    this.state.map.addLayer(this.state.currentLayer);
  }

 /* componentDidUpdate() {  
    console.log(this.props.resources);

    this.state.map.removeLayer(this.state.currentLayer);
    this.state.currentLayer = L.geoJson(this.props.geoData, {
      style: this.getHeat,
      onEachFeature: this.onEachFeature.bind(this)
    });
    this.state.map.addLayer(this.state.currentLayer);
  }*/

  render() {
    const styles = {
      map: {
        height: "600px",
        width: "500px"
      }
    }
    return (
      <div id="map" style={styles.map}>
      </div>
    )
  }
}

Map.propTypes = {
  geoData: React.PropTypes.array,
  data: React.PropTypes.array,
  updateRegion: React.PropTypes.func,
  update: React.PropTypes.func
};

export default Map;