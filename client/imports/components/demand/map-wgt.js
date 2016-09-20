import React from "react";
import { Meteor } from "meteor/meteor";

import { popDensity, popDelta } from "../../functions/heat-maps";
import { mapKey } from "../../functions/map-key";
import { Map, Marker, Popup, TileLayer, GeoJson } from 'react-leaflet';

_ = lodash;

class MapWgt extends React.Component {

  constructor(props) {
    super(props);
    
    // Bind context
    this.setLsoa = this.setLsoa.bind(this);
    this.style = this.style.bind(this);

    this.state = mapKey(props.data, props.geoData);
  }

  setLsoa(e) {
    const population = _.find(this.props.data, (poplet) => {
      if (poplet._id === e.target.feature.properties.LSOA11CD) return true;
      else return false;
    }).year2; // Year 2 is the current year in slider, maybe best to rename these to current and delat year?
    const lsoa = {
      id: e.target.feature.properties.LSOA11CD,
      name: e.target.feature.properties.LSOA11NM,
      population: population,
      area: e.target.feature.properties.area
    };
    this.props.update(lsoa);
  }

  onEachFeature(feature, layer) {
    layer.on({
      click: this.setLsoa
    });
  }

  style(feature) {
    return this.props.settings.delta ? popDelta(feature, this.props, this.state.deltaKey) : popDensity(feature, this.props, this.state.densityKey);
  }

  // Required due to strange behaviour in Komposer causing multiple renders per prop update
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.data === this.props.data) return false;
    else return true;   
  }
  componentWillReceiveProps(nextProps) {
    this.setState(mapKey(nextProps.data, nextProps.geoData));
  }


  render() {

    const url = "https://api.tiles.mapbox.com/v4/" + Meteor.settings.public.mapUsername + "/{z}/{x}/{y}.png?access_token=" + Meteor.settings.public.mapPassword;
    return (

        <Map center={this.props.centre} zoom={9}>
          <TileLayer
            url={url}
            attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
          />
          <GeoJson
            data={this.props.geoData}
            style={this.style}
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
  settings: React.PropTypes.object.isRequired,
  filter: React.PropTypes.object.isRequired
};

export default MapWgt;