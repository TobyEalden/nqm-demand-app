import React from "react";

import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this.state = {
      password: ""
    }
  }
  _onKeyDown(evt) {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      this._onSubmit();
    }
  }
  _onSubmit() {
    if (this.props.onEnter) {
      this.props.onEnter(this.state.password);
    }
  }
  _onChange(e,value) {
    this.setState({password:value});
  }
  render() {
    return (
      <div>
        <h1>login</h1>
        <TextField type="password" floatingLabelText="password" onChange={this._onChange} value={this.state.password} onKeyDown={this._onKeyDown} />
        <br />
        <br />
        <RaisedButton onTouchTap={this._onSubmit} label="login" />
      </div>
    );
  }
}

Login.propTypes = {
  onEnter: React.PropTypes.func
}

export default Login;