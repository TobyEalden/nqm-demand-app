import {compose} from "react-komposer";
import loadAggregate from "../composers/aggregate";
import ProgressIndicator from "../components/progress-indicator";
import MapWrapper from "../components/scenario-planner/map-wrapper";

// Makes an aggregate query and feeds to lsoa component
export default compose(loadAggregate, ProgressIndicator)(MapWrapper);