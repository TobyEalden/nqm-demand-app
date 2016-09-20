import {Meteor} from "meteor/meteor";

function defaultState(lsoas, region, name, area) {
  const state = {
    widgets: {
      map: {
        filter: {
          area_id: {
            $in: lsoas
          },
          "age_band": {
            "$in": [
              "All Ages"
            ]
          },
          year: {
            "$in": [
              new Date().getFullYear().toString(),
              new Date().getFullYear().toString()
            ]
          },
          "gender": {
            "$in": [
              "male", "female"
            ]
          }
        },
        options: {
          sort: {area_id:-1, year: -1},
          limit: 2500
        },
        settings: {
          delta: false,
        }
      },
      pyramid: {
        filter: {
          "area_id": {
            "$eq": region
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
            "$in": Meteor.settings.public.allAgeBands
          },
          "gender": {
            "$in": [
              "male", "female"
            ]
          }
        }
      },
      timeline: {
        filter: {
          "area_id": {
            "$eq": region
          },
          "age_band": {
            "$in": Meteor.settings.public.allAgeBands
          }, 
          "gender": {
            "$in": [
              "male", "female"
            ]
          }
        },          
        options: {
          limit: 1000
        },
      }
    },
    lsoa: {
      id: region,
      name: name,
      population: 0,
      area: area
    },
    zoomed: false
  };

  return state;

}

export { defaultState };