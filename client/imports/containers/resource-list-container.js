import {composeWithTracker} from "react-komposer";
import ResourceList from "../components/resource-list";
import loadResources from "../composers/load-resources";

export default composeWithTracker(loadResources)(ResourceList);