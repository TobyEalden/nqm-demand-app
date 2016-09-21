import { Meteor } from "meteor/meteor";

_ = lodash;

function encode(region, state, centre) {
  let link = "/" + region + "/";
  link += state.lsoa.id + "/";
  if (state.widgets.map.filter.gender["$in"].length === 2) link += "b";
  else if (state.widgets.map.filter.gender["$in"].indexOf("male") != -1) link += "m";
  else link += "f";
  link += "/";
  link += state.widgets.map.settings.delta ? "t/" : "f/";
  if (state.widgets.map.filter.age_band["$in"].indexOf("All Ages") != -1) {
    link += "X";
  }
  else {
    _.each(state.widgets.map.filter.age_band["$in"], (year) => {
      const ind = Meteor.settings.public.allAgeBands.indexOf(year);
      if (ind != -1) link += ind.toString(16) + ":";
    }); 
  }
  link += "/" + state.widgets.map.filter.year["$in"][1];
  link += "/" + state.lsoa.population;
  link += "/" + Math.floor(state.lsoa.area);
  link += "/" + encodeURI(state.lsoa.name);
  link += "/" + JSON.stringify(centre) + "/";
  link += state.zoomed ? "t" : "f";
  console.log(link);
}


function decode(link) {

  let gender = [];
  switch(link.gender) {
  case "b" : 
    gender.push("male");
    gender.push("female");
    break;
  case "m":
    gender.push("male");
    break;
  case "f":
    gender.push("female");
  }
  let delta = false;
  if (link.delta === "t") delta = true; 
  let age_band = [];
  if (link.ageBand === "X") age_band.push("All Ages");
  else {
    const bands = link.ageBand.split(":");
    for (let i = 0; i < bands.length - 1; i++) age_band.push(Meteor.settings.public.allAgeBands[parseInt(bands[i],16)]);
  }
  let zoomed = false;
  if (link.zoomed === "t") zoomed = true;

  const state = {
    widgets: {
      map: {
        filter: {
          area_id: {
            $in: []
          },
          "age_band": {
            "$in": age_band
          },
          year: {
            "$in": [
              new Date().getFullYear().toString(),
              link.year
            ]
          },
          "gender": {
            "$in": gender
          }
        },
        options: {
          sort: {area_id:-1, year: -1},
          limit: 2500
        },
        settings: {
          delta: delta,
          area_id: link.lsoa
        }
      },
      pyramid: {
        filter: {
          "area_id": {
            "$eq": zoomed ? link.lsoa : link.region
          },
          "year": {
            "$eq": new Date().getFullYear().toString()
          }
        },
        options: {
          limit: 1000
        },
        settings: {
          "age_band": {
            "$in": age_band
          },
          "gender": {
            "$in": gender
          }
        }
      },
      timeline: {
        filter: {
          "area_id": {
            "$eq": zoomed ? link.lsoa : link.region
          },
          "age_band": {
            "$in": age_band
          }, 
          "gender": {
            "$in": gender
          }
        },          
        options: {
          limit: 1000
        },
      },
      minimap: {
        filter:  {},
        options: {
          limit: 1000
        }
      }
    },
    lsoa: {
      id: link.lsoa,
      name: decodeURI(link.name),
      population: link.population,
      area: link.area
    },
    zoomed: zoomed
  };

  state.widgets.minimap.filter = zoomed ? {"properties.LSOA11CD": { "$eq": link.lsoa }} :  {"properties.LAD15CD": {"$eq": link.region}};

  return state;

}
export { encode, decode };