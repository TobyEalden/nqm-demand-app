import React from "react";

import { popDensity, popDelta } from "../functions/heat-maps";
import { Map, Marker, Popup, TileLayer, GeoJson } from 'react-leaflet';

class MapWgt extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.setLsoa = this.setLsoa.bind(this);

  }

  setLsoa(e) {
    this.props.update(e.target.feature.properties.LSOA11CD);
  }

  onEachFeature(feature, layer) {
    layer.on({
      click: this.setLsoa
    });
  }

  style(feature) {
    return this.props.delta ? popDelta(feature, this.props) : popDensity(feature, this.props);
  }

  shouldComponentUpdate(nextProps, nextState) {

    if (nextProps.data[nextProps.data.length - 1] == this.props.data[this.props.data.length - 1] && nextProps.delta == this.props.delta) return false;
    else return true;

  }

  render() {

    const accessToken = "pk.eyJ1IjoibnFtaXZhbiIsImEiOiJjaXJsendoMHMwMDM3aGtuaGh2bWt5OXRvIn0.6iCk2i96NUucsyDlbnVtiA";
    const id = "nqmivan.12id4bh0";
    const url = "https://api.tiles.mapbox.com/v4/" + id + "/{z}/{x}/{y}.png?access_token=" + accessToken;
    return (

        <Map center={this.props.centre} zoom={9}>
          <TileLayer
            url={url}
            attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
          />
          <GeoJson
            data={this.props.geoData}
            style={this.style.bind(this)}
            onEachFeature={this.onEachFeature.bind(this)}
          />
        </Map>

    )
  }
}

MapWgt.propTypes = {
  wgtId: React.PropTypes.string.isRequired,
  geoData: React.PropTypes.array.isRequired,
  data: React.PropTypes.array.isRequired,
  update: React.PropTypes.func.isRequired,
  centre: React.PropTypes.object,
  delta: React.PropTypes.bool.isRequired,
};

export default MapWgt;