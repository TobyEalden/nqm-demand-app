import {composeWithTracker} from "react-komposer";
import loadMapData from "../composers/load-map-data-api";
import ProgressIndicator from "../components/progress-indicator";
import Map from "../components/counties-map-wgt";

// County map, only ever displays geojson data, if it ever needs to display other data this 
// can be replaced with map-container
export default composeWithTracker(loadMapData, ProgressIndicator)(Map);