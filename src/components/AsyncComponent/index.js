import React, { Component } from "react";

export default function AsyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        Comp: null
      };
    }
    componentDidMount() {
      importComponent().then(module => {
        this.setState({
          Comp: module.default
        });
      });
    }
    render() {
      const { Comp } = this.state;
      return Comp ? <Comp {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}
