import React from "react";

import { Meteor } from "meteor/meteor";
import { Map, Marker, Popup, TileLayer, GeoJson } from 'react-leaflet';
import { centreOf } from "../../functions/geo-centre";
class Minimap extends React.Component {

  render() {
    const url = "https://api.tiles.mapbox.com/v4/" + Meteor.settings.public.mapUsername + "/{z}/{x}/{y}.png?access_token=" + Meteor.settings.public.mapPassword;
    console.log(this.props.geoData);
    return (

      <Map center={centreOf(this.props.geoData[0].geometry.coordinates[0])} zoom={9}>
        <TileLayer
          url={url}
          attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
        />
        <GeoJson key={this.props.lsoa}
          data={this.props.geoData}
          style={{color: "#FF0000", weight: 3, fillOpacity: 0.0}}
        />
      </Map>
    )
  }

}

Minimap.propTypes = {
  geoData: React.PropTypes.array.isRequired,
  wgtId: React.PropTypes.string.isRequired,
  lsoa: React.PropTypes.string // SHould really be required but throws an error for some reason
};

export default Minimap;

