_ = lodash;

function encode(widgets, url) {

  let iString = url + ":";

  // Comparison year
  iString += widgets.map.filter.year["$in"][1] + ":";
  // Map mode
  iString += widgets.map.settings.delta ? "t" : "f";
  iString += ":";
  // Area id
  iString += widgets.pyramid.filter["area_id"]["$eq"];


}

export { encode };