import {Meteor} from "meteor/meteor";

function mapKey(data, geoData) {

  let sortedDensity = [];
  let sortedDelta = [];
  let currentLsoa = "";
  let area = 0;
  let lastYear = 0;
  for (let i = 0; i < data.length; i += 2) {
    const persons = data[i].persons + data[i+1].persons;
    if (currentLsoa != data[i].area_id) {
      currentLsoa = data[i].area_id;
      area = _.find(geoData, function(lsoa) {
        if (lsoa.properties.LSOA11CD == currentLsoa) return true;
        else return false;
      }).properties.area;
      lastYear = persons;
    }
    if (lastYear != persons) {
      sortedDelta.push(persons - lastYear);
      lastYear = persons;
    }
    sortedDensity.push(persons/area);
  }
  sortedDensity.sort();
  sortedDelta.sort();
  let hop = Math.floor(sortedDensity.length/Meteor.settings.public.heatMapKey.length);
  let densityKey = [];
  for (let i = hop; i < sortedDensity.length; i += hop) densityKey.push(sortedDensity[i]);
  hop = Math.floor(sortedDelta.length/Meteor.settings.public.heatMapKey.length);
  let deltaKey = [];
  for (let i = hop; i < sortedDelta.length; i += hop) deltaKey.push(sortedDelta[i]);

  return {
    densityKey: densityKey,
    deltaKey: deltaKey
  };
}

export { mapKey };