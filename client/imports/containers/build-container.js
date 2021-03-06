import {compose} from "react-komposer";
import loadData from "../composers/load-data-api";
import ProgressIndicator from "../components/progress-indicator";
import BuildEditor from "../components/scenario-planner/build-editor";

// Makes an aggregate query and feeds to lsoa component
export default compose(loadData, ProgressIndicator)(BuildEditor);