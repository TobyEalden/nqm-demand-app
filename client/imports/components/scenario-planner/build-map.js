import React from "react";
import { Meteor } from "meteor/meteor";

import { Map, Marker, Popup, TileLayer, GeoJson } from 'react-leaflet';
import CountyDetails from "../county-view/county-details";

class BuildMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };

    this.addRegion = this.addRegion.bind(this);
    this.highlight = this.highlight.bind(this);
    this.resetStyle = this.resetStyle.bind(this);
  }

  addRegion(e) {
    this.props.update(e.target.feature.properties.LSOA11CD, e.target.feature.properties.LSOA11NM);
  }

  highlight(e) {
    this.setState({
      name: e.target.feature.properties.LSOA11NM
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
      click: this.addRegion,
      mouseover: this.highlight,
      mouseout: this.resetStyle
    });
  }

  render() {
    const url = "https://api.tiles.mapbox.com/v4/" + Meteor.settings.public.mapUsername + "/{z}/{x}/{y}.png?access_token=" + Meteor.settings.public.mapPassword;
    return (
      <div id="map-container">
        <Map center={[53, -3]} zoom={6}>
          <TileLayer
            url={url}
            attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
          />
          <GeoJson
            data={this.props.geoData}
            style={{color: '#FF0000', weight: 1, opacity: 0.5}}
            onEachFeature={this.onEachFeature.bind(this)}
          />
        </Map>
        <CountyDetails name={this.state.name} />
      </div>
    );
  }


}

BuildMap.propTypes = {
  geoData: React.PropTypes.array.isRequired,
  update: React.PropTypes.func.isRequired,
  wgtId: React.PropTypes.string.isRequired
};

export default BuildMap;