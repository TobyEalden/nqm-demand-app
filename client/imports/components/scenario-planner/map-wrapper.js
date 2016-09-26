import React from "react";
import { Meteor } from "meteor/meteor";

import MapWidget from "../../containers/build-map-container";

class MapWrapper extends React.Component {

  render() {
    return <MapWidget wgtId="map" mapId={Meteor.settings.public.lsoaGeo} mapFilter={{"properties.LSOA11CD":{"$in":this.props.data}}} options={{limit: 2500}} update={this.props.update} />
  }
}

MapWrapper.propTypes = {
  data: React.PropTypes.array.isRequired,
  update: React.PropTypes.func.isRequired
};

export default MapWrapper;
