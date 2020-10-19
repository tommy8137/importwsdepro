import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Icon = styled.div`
  display: inline-block;
  vertical-align: middle;
  pointer-events: ${p => (p.type === 'disable' ? 'none' : 'inherit')};


  svg{
    display: block;
    width:100%;
  }
`;

/**
 * icon: icon名稱
 * type: icon目前狀態
 * size: icon大小
 */

export default class IconComponent extends Component {
  static propTypes = {
    /** icon名稱 Btn開頭有多種屬性  Ico開頭只有一種屬性 */
    icon: PropTypes.string,
    /** 'normal' | 'hover' | 'press' | disable' | 'select' | half */
    type: PropTypes.string,
  }
  static defaultProps = {
    icon: '',
    type: '',
  }
  constructor(props) {
    super(props);
    this.state = {
      iconComponent: '',
      type: 'normal'
    };
  }
  componentWillMount() {
    if (this.props.icon) {
      this.getIconComponent(this.props.icon);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.icon !== nextProps.icon) {
      this.getIconComponent(nextProps.icon);
    }
  }
  onMouseEnter = () => {
    this.setState({
      ...this.state,
      type: 'hover'
    });
  }
  onMouseLeave = () => {
    this.setState({
      ...this.state,
      type: 'normal'
    });
  }
  onTouchStart = () => {
    this.setState({
      ...this.state,
      type: 'press'
    });
  }
  onTouchEnd = () => {
    this.setState({
      ...this.state,
      type: 'hover'
    });
  }
  getIconComponent = (icon) => {
    import(`./components/${icon}`)
      .then(component =>
        this.setState({
          iconComponent: component.default
        })
      )
      .catch(error => {
        console.log(error);
        this.setState({
          iconComponent: ''
        });
      });
  }
  render() {
    const type = this.props.type || this.state.type;
    const IconElement = this.state.iconComponent;
    return (
      <Icon
        className="icon"
        onMouseDown={this.onTouchStart}
        onMouseUp={this.onTouchEnd}
        onTouchStart={this.onTouchStart}
        onTouchEnd={this.onTouchEnd}
        onMouseLeave={this.onMouseLeave}
        onMouseEnter={this.onMouseEnter}
        innerRef={this.props.iconRef}
        {...this.props}
      >
        {IconElement ? <IconElement type={type} {...this.props} /> : <div />}
      </Icon>
    );
  }
}
