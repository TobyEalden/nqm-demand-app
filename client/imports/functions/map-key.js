import {Meteor} from "meteor/meteor";

_ = lodash;

function mapKey(data, geoData) {

  let sortedDensity = [];
  let sortedDelta = [];

  for (let i = 0; i < data.length; i++) {
    let area = _.find(geoData, (lsoa) => {
      if (lsoa.properties.LSOA11CD == data[i]._id) return true;
      else return false;
    }).properties.area;
    sortedDensity.push(data[i].persons/area);
  }
  sortedDensity.sort();

  let hop = Math.floor(sortedDensity.length/Meteor.settings.public.heatMapKey.length);
  let densityKey = [];
  for (let i = hop; i < sortedDensity.length; i += hop) densityKey.push(sortedDensity[i]);

  /*hop = Math.floor(sortedDelta.length/Meteor.settings.public.heatMapKey.length);
  
  for (let i = hop; i < sortedDelta.length; i += hop) deltaKey.push(sortedDelta[i]);*/
  let deltaKey = [];

  return {
    densityKey: densityKey,
    deltaKey: deltaKey,
    maxDensity: sortedDensity[sortedDensity.length - 1],
    minDensity: sortedDensity[0],
    maxDelta: sortedDelta[sortedDelta.length - 1],
    minDelta: sortedDelta[0]
  };
}

export { mapKey };