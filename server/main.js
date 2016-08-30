import { Meteor } from 'meteor/meteor';
import request from 'superagent';
import { Counties } from '../imports/api/counties.js';
import { Lsoas } from '../imports/api/lsoas.js';

Meteor.startup(() => {

  request.get('https://q.nqminds.com/v1/datasets/Ske2zpaGj/data').end(Meteor.bindEnvironment(function(err, res) {
    if (err) console.log(err);
    else {
      _.forEach(res.body.data, function(doc) {
        Counties.insert(doc);
      })
      console.log(Counties.find({}).fetch());
    }
  }));
  request.get('https://q.nqminds.com/v1/datasets/SkxnzW0zi/data').end(Meteor.bindEnvironment(function(err, res) {
    if (err) console.log(err);
    else {
      _.forEach(res.body.data, function(doc) {
        Lsoas.insert(doc);
      })
    }
  }));


});

import '../imports/api/counties.js';
import '../imports/api/lsoas.js';
