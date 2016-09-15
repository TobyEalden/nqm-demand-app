import {composeWithTracker} from "react-komposer";
import {composeAll} from "react-komposer";

import MapWgt from "../components/map-wgt";
import loadData from "../composers/aggregate-poplets";
import loadMapData from "../composers/load-map-data-api";
import ProgressIndicator from "../components/progress-indicator";

export default composeAll(composeWithTracker(loadMapData, ProgressIndicator), composeWithTracker(loadData, ProgressIndicator))(MapWgt);