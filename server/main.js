import { Meteor } from 'meteor/meteor';
import request from 'superagent';
import { GeoData } from '../imports/api/geoData.js';
import { RegionData } from '../imports/api/regionData.js';

Meteor.startup(() => {

  request.get('https://q.nqminds.com/v1/datasets/Ske2zpaGj/data').end(Meteor.bindEnvironment(function(err, res) {
    if (err) console.log(err);
    else {
      _.forEach(res.body.data, function(doc) {
        GeoData.insert(doc);
      })
    }
  }));
  request.get('https://q.nqminds.com/v1/datasets/SkxnzW0zi/data').end(Meteor.bindEnvironment(function(err, res) {
    if (err) console.log(err);
    else {
      _.forEach(res.body.data, function(doc) {
        RegionData.insert(doc);
      })     
    }
  }));
});

import '../imports/api/geoData.js';
import '../imports/api/regionData.js';