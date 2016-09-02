import React from "react";

const style = {
  width: "49%",
  float: "left",
};

class Panel extends React.Component { 

  render() {
    return (
      <div style={style}>
          {this.props.children}
      </div>
    );
  }
}

export default Panel;