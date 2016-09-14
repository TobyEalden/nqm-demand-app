import {Meteor} from "meteor/meteor";

function mapKey(data, geoData, nAgeBands) {

  let sortedDensity = [];
  let sortedDelta = [];
  let currentLsoa = "";
  let area = 0;
  let lastYear = 0;

  for (let i = 0; i < data.length; i += nAgeBands*2) {
    let persons = 0;
    for (let j = 0; j < nAgeBands*2; j++) persons+= data[i + j].persons; // Sum for men and women across all active age bands


    if (currentLsoa != data[i].area_id) { // Data is ordered based on year and LSOA
      currentLsoa = data[i].area_id;
      area = _.find(geoData, function(lsoa) {
        if (lsoa.properties.LSOA11CD == currentLsoa) return true;
        else return false;
      }).properties.area;
      lastYear = persons;
    }

    if (lastYear != persons) { // Deltas
      sortedDelta.push(persons - lastYear);
      lastYear = persons;
    }
    sortedDensity.push(persons/area); // Densities
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
    deltaKey: deltaKey,
    maxDensity: sortedDensity[sortedDensity.length - 1],
    minDensity: sortedDensity[0],
    maxDelta: sortedDelta[sortedDelta.length - 1],
    minDelta: sortedDelta[0]
  };
}

export { mapKey };