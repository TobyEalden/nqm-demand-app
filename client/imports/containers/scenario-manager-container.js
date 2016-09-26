import {composeWithTracker} from "react-komposer";
import loadData from "../composers/load-resource-data";
import ProgressIndicator from "../components/progress-indicator";
import ScenarioManager from "../components/scenario-planner/scenario-manager";

// Makes an aggregate query and feeds to lsoa component
export default composeWithTracker(loadData, ProgressIndicator)(ScenarioManager);