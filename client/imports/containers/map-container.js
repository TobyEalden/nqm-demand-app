import {compose} from "react-komposer";

import MapWgt from "../components/demand/map-wgt";
//import loadData from "../composers/aggregate-poplets";
//import loadMapData from "../composers/load-map-data-api";
import loadMapData from "../composers/map";
import ProgressIndicator from "../components/progress-indicator";

//export default composeAll(composeWithTracker(loadMapData, ProgressIndicator), composeWithTracker(loadData, ProgressIndicator))(MapWgt);
export default compose(loadMapData, ProgressIndicator)(MapWgt);
