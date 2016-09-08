import React from "react";
import CountyDetails from "./county-details";

class CountiesMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };

    this.updateRegion = this.updateRegion.bind(this);
    this.highlight = this.highlight.bind(this);
    this.resetStyle = this.resetStyle.bind(this);
    this.onEachFeature = this.onEachFeature.bind(this);
  }

  updateRegion(e) {
    this.props.updateRegion(e.target.feature.properties.LAD15CD, e.latlng);
  }

  highlight(e) {
    this.setState({
      name: e.target.feature.properties.LAD15NM
    });
    let layer = e.target;
    layer.setStyle({
        weight: 5
    });
  }

  resetStyle(e) {
    let layer = e.target;
    layer.setStyle({
      weight: 1
    });
  }
  
  onEachFeature(feature, layer) {
    layer.on({
      click: this.updateRegion,
      mouseover: this.highlight,
      mouseout: this.resetStyle
    });
  }

  componentDidMount() { // This map is static, it does not expect to update once drawn
    let map = L.map('map', {
        center: [53, -3],
        zoom: 6
    });    
    L.tileLayer('', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'nqmivan.12id4bh0',
        accessToken: 'pk.eyJ1IjoibnFtaXZhbiIsImEiOiJjaXJsendoMHMwMDM3aGtuaGh2bWt5OXRvIn0.6iCk2i96NUucsyDlbnVtiA'
    }).addTo(map);
      
    let currentLayer = L.geoJson(this.props.geoData, {
      style: {color: '#FF0000', weight: 1, opacity: 0.5},
      onEachFeature: this.onEachFeature
    });
    map.addLayer(currentLayer);
  }

  render() {
    const styles = {
      map: {
        height: "600px",
        width: "700px"
      }
    }

    return (
      <div>
        <div id="map" style={styles.map}>
        </div>
        <CountyDetails name={this.state.name} />
      </div>
    )
  }
}

CountiesMap.propTypes = {
  geoData: React.PropTypes.array.isRequired,
  updateRegion: React.PropTypes.func.isRequired,
  wgtId: React.PropTypes.string.isRequired,
  mapId: React.PropTypes.string.isRequired,
  data: React.PropTypes.array, 
  update: React.PropTypes.func,
  centre: React.PropTypes.object
};

export default CountiesMap;