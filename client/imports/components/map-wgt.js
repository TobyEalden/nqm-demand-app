import React from "react";
import YearSlider from "./year-slider";

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }



  updateRegion(e) {
    //this.props.updateRegion("e.target.feature.properties.parent_id");
    this.state.map.fitBounds(e.target.getBounds());
    this.props.updateRegion(e.target.feature.properties.LSOA11CD);
  }

  onEachFeature(feature, layer) {
    layer.on({
      click: this.updateRegion.bind(this)
    });
  }

  style(feature) {
    return this.props.heat(feature);
  }

  setYear(year) {
    let filter = _.clone(this.props.filter);
    filter.year = {"$eq":year.toString()};


    this.props.update(this.props.wgtId, this.props.options, filter);
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
      
    let currentLayer = L.geoJson(this.props.geoData, {
      style: this.style.bind(this),
      onEachFeature: this.onEachFeature.bind(this)
    });
    map.addLayer(currentLayer);

    this.setState({
      map: map,
      currentLayer: currentLayer
    });
    
  }

  componentWillReceiveProps(nextProps) {
    this.state.map.removeLayer(this.state.currentLayer);
    let currentLayer = L.geoJson(nextProps.geoData, {
      style: this.style.bind(this),
      onEachFeature: this.onEachFeature.bind(this)
    });
    this.state.map.addLayer(currentLayer);
    this.setState({
      currentLayer: currentLayer
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
      <div>
        <div id="map" style={styles.map}>
        </div>
        <YearSlider update={this.setYear.bind(this)}/>
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
  heat: React.PropTypes.func
};

export default Map;