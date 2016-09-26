import {compose} from "react-komposer";
import loadData from "../composers/load-data-api";
import ProgressIndicator from "../components/progress-indicator";
import ScenarioManager from "../components/scenario-planner/scenario-manager";

// Makes an aggregate query and feeds to lsoa component
export default compose(loadData, ProgressIndicator)(ScenarioManager);