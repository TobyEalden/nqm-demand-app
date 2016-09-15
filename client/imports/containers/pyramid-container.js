import {composeWithTracker} from "react-komposer";

import loadData from "../composers/load-data-api";
import Pyramid from "../components/pyramid-wgt";
import ProgressIndicator from "../components/progress-indicator";

export default composeWithTracker(loadData, ProgressIndicator)(Pyramid);