import {composeWithTracker} from "react-komposer";

import loadData from "../composers/aggregate-poplets";
import TableData from "../components/table-data";
import ProgressIndicator from "../components/progress-indicator";

export default composeWithTracker(loadData, ProgressIndicator)(TableData);