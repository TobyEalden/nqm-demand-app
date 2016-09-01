import {composeWithTracker} from "react-komposer";
import ResourceData from "../components/resource-data";
import loadResourceData from "../composers/load-resource-data";

// Use the loadResourceData composer to populate the "data" property of the ResourceData component.
export default composeWithTracker(loadResourceData)(ResourceData);