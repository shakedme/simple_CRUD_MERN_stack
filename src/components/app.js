import React, { Component } from 'react';
import Users from './users';

export default class App extends Component {
  render() {
    return (
      <div>
       {this.props.children}
      </div>
    );
  }
}
