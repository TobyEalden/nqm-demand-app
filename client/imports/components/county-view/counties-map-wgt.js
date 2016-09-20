import React from "react";
import { Map, Marker, Popup, TileLayer, GeoJson } from 'react-leaflet';
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
    this.props.updateRegion(e.target.feature.properties.LAD15CD, e.latlng, e.target.feature.properties.LAD15NM, e.target.feature.properties.area);
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

  render() {
    return (
      <div id="map-container">
        <Map center={[53, -3]} zoom={6}>
          <GeoJson
            data={this.props.geoData}
            style={{color: '#FF0000', weight: 1, opacity: 0.5}}
            onEachFeature={this.onEachFeature.bind(this)}
          />
        </Map>
        <CountyDetails name={this.state.name} />
      </div>
    )
  }
}

CountiesMap.propTypes = {
  geoData: React.PropTypes.array.isRequired,
  updateRegion: React.PropTypes.func.isRequired,
  wgtId: React.PropTypes.string.isRequired,
};

export default CountiesMap;