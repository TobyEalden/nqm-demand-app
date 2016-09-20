import {composeWithTracker} from "react-komposer";
import loadAggregate from "../composers/aggregate";
import ProgressIndicator from "../components/progress-indicator";
import Demand from "../components/demand/demand";

// Makes an aggregate query and feeds to lsoa component
export default composeWithTracker(loadAggregate, ProgressIndicator)(Demand);