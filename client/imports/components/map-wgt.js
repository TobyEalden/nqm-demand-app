import React from "react";

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
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

    let map = L.map('map', {
        center: [this.props.settings.options.centre.lat, this.props.settings.options.centre.lng],
        zoom: 9
    });    
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'nqmivan.12id4bh0',
        accessToken: 'pk.eyJ1IjoibnFtaXZhbiIsImEiOiJjaXJsendoMHMwMDM3aGtuaGh2bWt5OXRvIn0.6iCk2i96NUucsyDlbnVtiA'
    }).addTo(map);
      
    let currentLayer = L.geoJson(this.props.geoData, {
      style: {color: '#FF0000', weight: 1, opacity: 0.5},
      onEachFeature: this.onEachFeature.bind(this)
    });
    map.addLayer(currentLayer);

    this.setState({
      map: map
    });
    
  }
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
  update: React.PropTypes.func,
  settings: React.PropTypes.object
};

export default Map;