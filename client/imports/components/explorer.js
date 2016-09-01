import React from "react";
import {Meteor} from "meteor/meteor";

import ResourceList from "../containers/resource-list-container";
import ResourceData from "../containers/resource-data-container";

import FlatButton from "material-ui/FlatButton";
import FontIcon from "material-ui/FontIcon";
import Divider from "material-ui/Divider";

class Explorer extends React.Component {
  constructor(props) {
    super(props);

    // Bind event handlers to "this"
    this._onFolder = this._onFolder.bind(this);
    this._onResource = this._onResource.bind(this);
    this._onBack = this._onBack.bind(this);
  }
  _onResource(resource) {
    // A non-folder resource has been clicked on => attempt to show resource contents
    FlowRouter.go("resource", { id: resource.id });    
  }
  _onFolder(folder) {
    // A folder resource has been clicked on => make the folder the new parent.
    FlowRouter.go("explorer", { parent: folder.id });
  }
  _onBack() {
    // Just use the browser history, as our state is maintained on the URL.
    window.history.back();
  }
  render() {
    var styles = {
      backButton: {
        minWidth: 40
      }
    };

    // Default parent property to an empty array, which signifies no parent and therefore top-level resources 
    var parentId = this.props.parent || [];

    // Only need a back button if there is a non-null parent.
    var backButton;
    if (parentId.length > 0) {
      backButton = <FlatButton style={styles.backButton} icon={<FontIcon className="material-icons">arrow_back</FontIcon>} onTouchTap={this._onBack} label="back" />;
    }

    // Filter to retrieve folder resources that are children of the current parent.
    var folderFilter = {parents: parentId, baseType: "resourceGroup"};

    // Filter to retrieve non-folder resources that are children of the current parent.
    var fileFilter = {parents: parentId, baseType: {$ne: "resourceGroup"}};

    return (
      <div>
        {backButton}
        <ResourceList filter={folderFilter} options={{sort: { sortName: 1}}} onSelect={this._onFolder} />
        <ResourceList filter={fileFilter} options={{sort: { sortName: 1}}} onSelect={this._onResource} />
      </div>
    );
  }
}

Explorer.propTypes = {
  parent: React.PropTypes.string
};

export default Explorer;
