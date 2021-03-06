import {composeWithTracker} from "react-komposer";

import loadData from "../composers/aggregate-poplets";
import Timeline from "../components/demand/timeline-wgt";
import ProgressIndicator from "../components/progress-indicator";

export default composeWithTracker(loadData, ProgressIndicator)(Timeline);