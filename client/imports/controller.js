import loadResources from "./composers/load-resources";
import {composeWithTracker} from 'react-komposer';



export default class Controller {

  constructor() {
    this.filter = {limit: 1};
  }

  addWgt(widget) {
    return composeWithTracker(loadResources)(widget);
  }

  setFilter() {
    this.filter = {limit: 2};
  }


}