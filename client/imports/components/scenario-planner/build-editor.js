import React from "react";
import { Meteor } from "meteor/meteor";
import connectionManager from "../../connection-manager";
import TDXApi from "nqm-api-tdx/client-api";

import {Tabs, Tab} from 'material-ui/Tabs';
import PopIcon from "material-ui/svg-icons/action/supervisor-account";
import LSOAIcon from "material-ui/svg-icons/action/language";
import DistIcon from "material-ui/svg-icons/av/equalizer";
import Snackbar from 'material-ui/Snackbar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import MapWidget from "../../containers/map-wrapper-container";
import LSOATable from "./lsoa-table";
import DistributionTable from "./distribution-table";
import PopulationTable from "./population-table";

import { redistribute, redistributePyramid } from "../../functions/ratio-calculator"; 
import { genPoplets, getRecipe } from "../../functions/poplet-generator";



_ = lodash;

class BuildEditor extends React.Component {
  constructor(props) {
    super(props);
    let defaultAllocation = 1/Meteor.settings.public.allAgeBands.length;
    this.state = getRecipe(props.data);
    this.addRegion = this.addRegion.bind(this);
    this.removeRegion = this.removeRegion.bind(this);
    this.lsoaLock = this.lsoaLock.bind(this);
    this.lsoaUpdate = this.lsoaUpdate.bind(this);
    this.ageLock = this.ageLock.bind(this);
    this.ageUpdate = this.ageUpdate.bind(this);
    this.popUpdate = this.popUpdate.bind(this);
    this.removePop = this.removePop.bind(this);
    this.addPop = this.addPop.bind(this);
    this.save = this.save.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
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

  removeRegion(id) {

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
    if (male) band.male = value;
    else band.female = value;
    age_bands = redistributePyramid(age_bands);
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
    if (male) band.lockedMale = !band.lockedMale;
    else band.lockedFemale = !band.lockedFemale;
    age_bands = redistributePyramid(age_bands);
    this.setState({
      age_bands: age_bands
    });
  }

  popUpdate(id, population) {
    let populations = _.clone(this.state.populations);
    let pop = _.find(populations, (pop) => {
      if (pop.year === id.toString()) return true;
      else return false;
    });
    pop.population = population;
    this.setState({
      populations: populations
    });
  }

  removePop(id) {
    let populations = _.clone(this.state.populations);  
    _.remove(populations, (pop) => {
      if (pop.year === id.toString()) return true;
      else return false;
    });
    this.setState({
      populations: populations
    });
  }

  addPop(id, population) {
    let populations = _.clone(this.state.populations); 
    populations.push({year: id.toString(), population: population});
    this.setState({
      populations: populations
    });
  }

  save() {
    const config = {
      commandHost: Meteor.settings.public.commandHost,
      queryHost: Meteor.settings.public.queryHost,
      accessToken: connectionManager.authToken
    };
    const api = new TDXApi(config);
    api.truncateDataset(this.props.resourceId, (err, response) => {
      if (err) {
        console.log("Failed to erase data: ", err);
        this.setState({
          open: true,
          message: "Failed to save build"
        });
      }
      else {
        api.addDatasetData(this.props.resourceId, genPoplets(this.state.lsoaData, this.state.populations, this.state.age_bands), (err, response) => {
          if (err) {
            console.log("Failed to write data: ", err);
            this.setState({
              open: true,
              message: "Failed to save build"
            });
          }
          else {
            console.log("wrote to dataset");
            this.setState({
              open: true,
              message: "Build saved"
            });
          }
        });
      }
    });    
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  };

  render() {
    const pipeline='[{"$match":{"parent_id":"' + this.props.region + '","child_type":"LSOA11CD"}},{"$group":{"_id":null,"id_array":{"$push":"$child_id"}}}]';
    return (
      <div id="main-container">
        <MapWidget resourceId={Meteor.settings.public.lsoaMapping} pipeline={pipeline} update={this.addRegion} />
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
              <PopulationTable update={this.popUpdate} data={this.state.populations} remove={this.removePop} add={this.addPop}/>
            </Tab>
            <Tab
              icon={<DistIcon />}
              label="Age Distribution"
            >
              <DistributionTable update={this.ageUpdate} toggleLock={this.ageLock} data={this.state.age_bands} />
            </Tab>
          </Tabs>
                <FloatingActionButton onClick={this.save}>
          <ContentAdd />
        </FloatingActionButton>
        </div>
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />

      </div>
    );
  }

}

BuildEditor.propTypes = {
  data: React.PropTypes.array.isRequired,
  region: React.PropTypes.string.isRequired,
  resourceId: React.PropTypes.string.isRequired
};

export default BuildEditor;
