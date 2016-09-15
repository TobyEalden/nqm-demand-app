import {Meteor} from "meteor/meteor";

_ = lodash;

function popDensity(feature, props, keyValues) { 

  const population = _.find(props.data, (poplet) => {
    if (poplet._id == feature.properties.LSOA11CD && poplet.year.indexOf(props.filter.year["$in"][1]) != -1) return true;
    else return false;
  }).persons;
  
  let d = population/feature.properties.area;
  let i = 0;
  while (d > keyValues[i]) i++;
  if (i > keyValues.length) i = keyValues.length - 1;
  let heat = Meteor.settings.public.heatMapKey[i];
  return {fillColor: heat, color: "#FF0000", weight: 1, fillOpacity: 0.5};

}

function popDelta(feature, props, keyValues) {

  const originalPop = _.find(props.data, function (poplet) {
    if (poplet.year == this.settings.year[0] && poplet._id == feature.properties.LSOA11CD) return true;
    else return false;
  }.bind(props));

  const newPop = _.find(props.data, function (poplet) {
    if (poplet.year == this.settings.year[1] && poplet._id == feature.properties.LSOA11CD) return true;
    else return false;
  }.bind(props));

  const delta = newPop.persons - originalPop.persons;
  
  let i = 0;
  while (delta > keyValues[i]) i++;
  if (i > keyValues.length) i = keyValues.length - 1;
  let heat = Meteor.settings.public.heatMapKey[i];
  
  return {fillColor: heat, color: "#FF0000", weight: 1, fillOpacity: 0.5};

}

export { popDensity, popDelta }; 

