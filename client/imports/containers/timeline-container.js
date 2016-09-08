import {composeWithTracker} from "react-komposer";

import loadData from "../composers/load-resource-data";
import Timeline from "../components/timeline-wgt";
import ProgressIndicator from "../components/progress-indicator";

export default composeWithTracker(loadData, ProgressIndicator)(Timeline);