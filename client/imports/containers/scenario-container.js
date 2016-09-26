import {composeWithTracker} from "react-komposer";
import loadResources from "../composers/load-resources";
import ProgressIndicator from "../components/progress-indicator";
import ScenarioEditor from "../components/scenario-planner/scenario-editor";

// Makes an aggregate query and feeds to lsoa component
export default composeWithTracker(loadResources, ProgressIndicator)(ScenarioEditor);