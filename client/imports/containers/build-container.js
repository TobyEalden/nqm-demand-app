import {compose} from "react-komposer";
import loadAggregate from "../composers/aggregate";
import ProgressIndicator from "../components/progress-indicator";
import BuildEditor from "../components/scenario-planner/build-editor";

// Makes an aggregate query and feeds to lsoa component
export default compose(loadAggregate, ProgressIndicator)(BuildEditor);