import { Meteor } from 'meteor/meteor';

import { GeoData } from '../api/geoData.js';


export default class Controller {

  constructor() {
    Meteor.subscribe('geoData');
    console.log(GeoData.find().fetch());
  }

}