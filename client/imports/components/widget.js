import React from "react";
import WidgetButton from "./widget-button.js";

class Widget extends React.Component {

  setOptions() {
    let options = {limit: Math.floor(Math.random() *10)};
    this.props.update(this.props.wgtId, options);
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
  data: React.PropTypes.array,
  update: React.PropTypes.func 
};

export default Widget;