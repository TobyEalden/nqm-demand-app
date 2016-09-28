import {compose} from "react-komposer";
import loadScenario from "../composers/load-scenario";
import ProgressIndicator from "../components/progress-indicator";
import ScenarioCreator from "../components/scenario-planner/scenario-creator";

// County map, only ever displays geojson data, if it ever needs to display other data this 
// can be replaced with map-container
export default compose(loadScenario, ProgressIndicator)(ScenarioCreator);