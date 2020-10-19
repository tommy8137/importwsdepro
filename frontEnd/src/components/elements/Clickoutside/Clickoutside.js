import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ClickoutsideComponent extends Component {
  static propTypes = {
    handleBlur: PropTypes.func
  }
  static defaultProps = {
    handleBlur: () => { }
  }
  constructor(props) {
    super(props);
    this.state = {};
    this.wrapper = React.createRef();
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickoutside);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickoutside);
  }
  handleClickoutside = event => {
    const $wrap = this.wrapper.current;
    const node = event.target;
    const isClickInner = $wrap.contains(node);
    if (this.wrapper.current) {
      if (!isClickInner) {
        this.props.handleBlur();
      }
    }
  }
  render() {
    const { children, className } = this.props;
    return (
      <div
        className={className}
        ref={this.wrapper}
      >
        {children}
      </div>
    );
  }
}
