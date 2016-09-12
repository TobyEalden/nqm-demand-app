function popDensity(feature, props) { // Styling function, can this be moved externally

  const population = _.find(props.data, function (poplet) {
    if (poplet.area_id == feature.properties.LSOA11CD && poplet.year == this.filter.year["$in"][1]) return true;
    else return false;
  }.bind(props));
  
  let d = population.persons/feature.properties.area;
  let heat =  d > 0.014   ? "#800026" : 
              d > 0.01    ? "#bd0026" :    
              d > 0.005   ? "#e31a1c" :
              d > 0.001   ? "#fc4e2a" :
              d > 0.0005  ? "#fd8d3c" :
              d > 0.0001  ? "#feb24c" :
              d > 0.00008 ? "#fed976" :
              d > 0.00005 ? "#4292c6":
              d > 0.00003 ? "#2171b5" :
              d > 0.00001 ? "#08519c" :
                          "#08306b";
  return {fillColor: heat, color: "#FF0000", weight: 1, fillOpacity: 0.5};

}

function popDelta(feature, props) {

  const originalPop = _.find(props.data, function (poplet) {
    if (poplet.year == this.filter.year["$in"][0] && poplet.area_id == feature.properties.LSOA11CD) return true;
    else return false;
  }.bind(props));

  const newPop = _.find(props.data, function (poplet) {
    if (poplet.year == this.filter.year["$in"][1] && poplet.area_id == feature.properties.LSOA11CD) return true;
    else return false;
  }.bind(props));

  const delta = newPop.persons - originalPop.persons;
  
  let heat =  delta > 200   ? "#800026" : 
              delta > 100    ? "#bd0026" :    
              delta > 50   ? "#e31a1c" :
              delta > 25   ? "#fc4e2a" :
              delta > 10  ? "#fd8d3c" :
              delta > 0  ? "#feb24c" :
              delta > -10 ? "#fed976" :
              delta > -25 ? "#4292c6":
              delta > -50 ? "#2171b5" :
              delta > -100 ? "#08519c" :
                          "#08306b";
  return {fillColor: heat, color: "#FF0000", weight: 1, fillOpacity: 0.5};

}

export { popDensity, popDelta }; 

