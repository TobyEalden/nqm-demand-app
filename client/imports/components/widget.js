import React from "react";
import WidgetButton from "./widget-button.js";

class Widget extends React.Component {

  setFilter(_filter) {
    this.props.update(this.props.wgtId, this.props.options, _filter);
  }

  setOptions(_options) {
    this.props.update(this.props.wgtId, _options, this.props.filter);
  }

  render() {
    const styles = {
      list: {
        padding: 4
      }
    };
    const list = _.map(this.props.data, function(datum) {
      return <div key={datum.properties.LAD14CD}>{datum.properties.LAD14NM}</div>
    });
    return (
      <div>
        <div style={styles.list}>{list}</div>
        <WidgetButton action={this.setOptions.bind(this)} />
      </div>
    );
  }

}

Widget.propTypes = {
  data: React.PropTypes.array.isRequired,
  filter: React.PropTypes.object.isRequired,
  options: React.PropTypes.object.isRequired,
  wgtId: React.PropTypes.string.isRequired,
  update: React.PropTypes.func
};

export default Widget;