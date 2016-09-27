import React from "react";

import Chip from "material-ui/Chip";

_ = lodash;

class TableChips extends React.Component {

  constructor(props) {
    super(props);
    this.handleRequestDelete = this.handleRequestDelete.bind(this);
  }

  handleRequestDelete(event) {
    let found = false;
    let elem = event.target.parentNode;
    while (!found) {
      if (elem.id != "") found = true;
      else elem = elem.parentNode;
    }
    this.props.update(elem.id, true);
  }

  render() {
    const styles = {
      chip: {
        margin: 4,
      }
    };

    const selected = _.map(this.props.selected, (item) => {
      return (
        <Chip
          onRequestDelete={this.handleRequestDelete}
          key={item}
          id={item}
          style={styles.chip}
        >
          {item}
        </Chip>
      );
    });
    return(
      <div className="control-chips">
        {selected}
      </div>
    );

  }

}

TableChips.propTypes = {
  selected: React.PropTypes.array.isRequired,
  update: React.PropTypes.func.isRequired
};

export default TableChips;