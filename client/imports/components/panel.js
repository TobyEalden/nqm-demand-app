import React from "react";

class Panel extends React.Component { 

  render() {
    const style = {
      width: "49%",
      float: "left",
      position: "relative"
    };
    return (
      <div style={style}>
          {this.props.children}
      </div>
    );
  }
}

export default Panel;