import React from "react";

class ResourceList extends React.Component {
  render() {
    const styles = {
      list: {
        padding: 4
      }
    };
    const list = _.map(this.props.resources, function(res) {
      return <div key={res.id}>{res.name}</div>
    });
    return <div style={styles.list}>{list}</div>;
  }
}

ResourceList.propTypes = {
  resources: React.PropTypes.array
};

export default ResourceList;