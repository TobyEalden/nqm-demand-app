import React from "react";
import { Meteor } from "meteor/meteor";

import {Tabs, Tab} from 'material-ui/Tabs';
import PopIcon from "material-ui/svg-icons/action/supervisor-account";
import LSOAIcon from "material-ui/svg-icons/action/language";
import DistIcon from "material-ui/svg-icons/av/equalizer";

import MapWidget from "../../containers/build-map-container";
import LSOATable from "./lsoa-table";
import DistributionTable from "./distribution-table";

import { redistribute, redistributeMale, redistributeFemale } from "../../functions/ratio-calculator"; 

_ = lodash;

class BuildEditor extends React.Component {
  constructor(props) {
    super(props);
    let defaultAllocation = 1/Meteor.settings.public.allAgeBands.length;
    this.state = {
      name: "Dummy Data Build",
      lsoaData: [
        
      ],
      age_bands: _.map(Meteor.settings.public.allAgeBands, (band) => {
        return {range: band, male: defaultAllocation, female: defaultAllocation, lockedMale: false, lockedFemale: false};
      })
    }
    

    this.addRegion = this.addRegion.bind(this);
    this.removeRegion = this.removeRegion.bind(this);
    this.lsoaLock = this.lsoaLock.bind(this);
    this.lsoaUpdate = this.lsoaUpdate.bind(this);
    this.ageLock = this.ageLock.bind(this);
    this.ageUpdate = this.ageUpdate.bind(this);
  }

  addRegion(id, name) {
    if (!_.find(this.state.lsoaData, (lsoa) => {
      if (lsoa.area_id === id) return true;
      else return false;
    })) {
      let lsoaData = _.clone(this.state.lsoaData);  
      lsoaData.push({name: name, area_id: id, ratio: 0, locked: false});
      lsoaData = redistribute(lsoaData);
      this.setState({
        lsoaData: lsoaData
      });
    }
  }

  removeRegion(id, name) {

    let lsoaData = _.clone(this.state.lsoaData);  
    _.remove(lsoaData, (lsoa) => {
      if (lsoa.area_id === id) return true;
      else return false;
    });
    lsoaData = redistribute(lsoaData);
    this.setState({
      lsoaData: lsoaData
    });

  }

  lsoaUpdate(id, value) {
    let lsoaData = _.clone(this.state.lsoaData); 
    let lsoa = _.find(lsoaData, (lsoa) => {
      if (lsoa.area_id === id) return true;
      else return false;
    });
    lsoa.ratio = value;
    lsoaData = redistribute(lsoaData);
    this.setState({
      lsoaData: lsoaData
    });
  }

  lsoaLock(id) {
    let lsoaData = _.clone(this.state.lsoaData); 
    let lsoa = _.find(lsoaData, (lsoa) => {
      if (lsoa.area_id === id) return true;
      else return false;
    });
    lsoa.locked = !lsoa.locked;
    lsoaData = redistribute(lsoaData);
    this.setState({
      lsoaData: lsoaData
    });
  }

  ageUpdate(male, id, value) {
    let age_bands = _.clone(this.state.age_bands); 
    let band = _.find(age_bands, (band) => {
      if (band.range === id) return true;
      else return false;
    });
    if (male) {
      band.male = value;
      age_bands = redistributeMale(age_bands);
    }
    else {
      band.female = value;
      age_bands = redistributeFemale(age_bands);
    }
    this.setState({
      age_bands: age_bands
    });
  }

  ageLock(male, id) {
    let age_bands = _.clone(this.state.age_bands); 
    let band = _.find(age_bands, (band) => {
      if (band.range === id) return true;
      else return false;
    });
    if (male) {
      band.lockedMale = !band.lockedMale;
      age_bands = redistributeMale(age_bands);
    }
    else {
      band.lockedFemale = !band.lockedFemale;
      age_bands = redistributeFemale(age_bands);
    }
    this.setState({
      age_bands: age_bands
    });
  }
  render() {
    return (
      <div id="main-container">
        <MapWidget wgtId="map" mapId={Meteor.settings.public.lsoaGeo} mapFilter={{"properties.LSOA11CD":{"$in":this.props.data}}} options={{limit: 2500}} update={this.addRegion} />
        <div id="widget-container">
          <Tabs className="tab-container">
            <Tab
              icon={<LSOAIcon />}
              label="LSOAs"
            >
              <LSOATable update={this.lsoaUpdate} toggleLock={this.lsoaLock} data={this.state.lsoaData} remove={this.removeRegion}/>
            </Tab>
            <Tab
              icon={<PopIcon />}
              label="Population"
            >
            </Tab>
            <Tab
              icon={<DistIcon />}
              label="Age Distribution"
            >
              <DistributionTable update={this.ageUpdate} toggleLock={this.ageLock} data={this.state.age_bands} />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }

}

BuildEditor.propTypes = {
  data: React.PropTypes.array.isRequired
};

export default BuildEditor;
