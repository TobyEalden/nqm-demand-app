import React from "react";
import YearSlider from "./year-slider";
import MapToggle from "./map-toggle";

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.updateRegion = this.updateRegion.bind(this);
    this.setYear = this.setYear.bind(this);
    this.setMode = this.setMode.bind(this);
  }

  updateRegion(e) {
    this.state.map.fitBounds(e.target.getBounds());
    this.props.updateRegion(e.target.feature.properties.LSOA11CD);
  }

  onEachFeature(feature, layer) {
    layer.on({
      click: this.updateRegion
    });
  }

  style(feature) {
    return this.props.heat(feature);
  }

  setYear(year) {
    let filter = _.clone(this.props.filter);
    this.props.delta ? filter.year = {"$in": [new Date().getFullYear().toString(), year.toString()]} : filter.year = {"$eq":year.toString()};
    this.props.update(this.props.wgtId, this.props.options, filter);
  }

  setMode() {
    let filter = _.clone(this.props.filter);
    const year = new Date().getFullYear().toString();
    this.props.delta ? filter.year = {"$eq":year} : filter.year = {"$in": [year, year]};
    let delta = true;
    if (this.props.delta) delta = false;
    this.props.setMode(this.props.wgtId, delta, filter);
  }

  componentDidMount() {  

    let map = L.map('map', {
        center: [this.props.centre.lat, this.props.centre.lng],
        zoom: 9
    });   

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'nqmivan.12id4bh0',
        accessToken: 'pk.eyJ1IjoibnFtaXZhbiIsImEiOiJjaXJsendoMHMwMDM3aGtuaGh2bWt5OXRvIn0.6iCk2i96NUucsyDlbnVtiA'
    }).addTo(map);
      
    this.setState({ // Shouldn't really set state in componentDidMount...
      map: map
    });
    
  }

  componentDidUpdate() {
    this.state.map.eachLayer(function (layer) {
      if (!layer._bgBuffer)this.state.map.removeLayer(layer);
    }.bind(this));
    L.geoJson(this.props.geoData, {
        style: this.style.bind(this),
        onEachFeature: this.onEachFeature.bind(this)
    }).addTo(this.state.map);

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
        <YearSlider update={this.setYear}/>
        <MapToggle toggle={this.setMode}/>
      </div>
    )
  }
}

Map.propTypes = {
  geoData: React.PropTypes.array.isRequired,
  updateRegion: React.PropTypes.func.isRequired,
  wgtId: React.PropTypes.string.isRequired,
  filter: React.PropTypes.object.isRequired,
  options: React.PropTypes.object.isRequired,
  data: React.PropTypes.array, 
  update: React.PropTypes.func,
  centre: React.PropTypes.object,
  heat: React.PropTypes.func,
  delta: React.PropTypes.bool,
  setMode: React.PropTypes.func
};

export default Map;