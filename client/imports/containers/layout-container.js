import {composeWithTracker} from "react-komposer";
import checkAuthenticated from "../composers/authenticated";
import Layout from "../components/layout";

export default composeWithTracker(checkAuthenticated)(Layout);