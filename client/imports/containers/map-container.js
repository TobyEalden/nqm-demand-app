import {composeWithTracker} from "react-komposer";
import {composeAll} from "react-komposer";

import Map from "../components/map-wgt";
import loadData from "../composers/load-resource-data";
import loadMapData from "../composers/load-map-data";
import ProgressIndicator from "../components/progress-indicator";

export default composeAll(composeWithTracker(loadMapData, ProgressIndicator), composeWithTracker(loadData, ProgressIndicator))(Map);