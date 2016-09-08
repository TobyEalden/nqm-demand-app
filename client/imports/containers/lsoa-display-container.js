import {composeWithTracker} from "react-komposer";
import loadAggregate from "../composers/aggregate";
import ProgressIndicator from "../components/progress-indicator";
import Lsoas from "../components/lsoas";

// Makes an aggregate query and feeds to lsoa component
export default composeWithTracker(loadAggregate, ProgressIndicator)(Lsoas);