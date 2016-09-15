import React from "react";

import { popDensity, popDelta } from "../functions/heat-maps";
import { mapKey } from "../functions/map-key";
import { Map, Marker, Popup, TileLayer, GeoJson } from 'react-leaflet';

_ = lodash;

class MapWgt extends React.Component {

  /*constructor(props) {
    super(props);
    
    this.setLsoa = this.setLsoa.bind(this);
    this.style = this.style.bind(this);
    this.state = mapKey(props.data, props.geoData);
    

  }

  setLsoa(e) {
    const population = _.find(this.props.data, (poplet) => {
      if (poplet._id === e.target.feature.properties.LSOA11CD && poplet.year[1] === this.props.filter.year["$in"][1]) return true;
      else return false;
    }).persons;
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

  /*shouldComponentUpdate(nextProps, nextState) {

    if (nextProps.filter == this.props.filter && nextProps.settings.delta == this.props.settings.delta) return false;
    else {
      this.setState(mapKey(nextProps.data, nextProps.geoData));
      
      return true;
    }
  }*/
 /* componentWillReceiveProps(nextProps) {
    console.log("receive props");
    this.setState(mapKey(nextProps.data, nextProps.geoData));
  }


  render() {
    console.log("Render of Map");

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
            style={this.style}
            onEachFeature={this.onEachFeature.bind(this)}
          />
        </Map>

    )
  }*/
  render() {
    console.log("Render map");
    return(<div></div>);
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