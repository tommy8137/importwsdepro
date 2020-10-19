import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Svg = styled.svg`
  .cls-1 {
    transition:0.3s ease all;
    fill:${props => props.config.circle.fill};
    stroke:${props => props.config.circle.stroke};
    opacity:${props => props.config.circle.opacity};
  }
  .cls-2 {
    transition:0.3s ease all;
    fill:${props => props.config.pen.fill};
    stroke:${props => props.config.pen.stroke};
    opacity:${props => props.config.pen.opacity};
  }
  .cls-3 {
    opacity:0
  }
  .cls-4 {
    stroke:none
  }
`;

const types = {
  normal: {
    circle: {
      fill: '#fff',
      stroke: '#333',
      opacity: 1
    },
    pen: {
      fill: '#333',
      stroke: 'none',
      opacity: 1
    }
  },
  hover: {
    circle: {
      fill: '#555',
      stroke: '#555',
      opacity: 1
    },
    pen: {
      fill: '#fff',
      stroke: '#555',
      opacity: 1
    }
  },
  press: {
    circle: {
      fill: '#1e1e1e',
      stroke: '#333',
      opacity: 1
    },
    pen: {
      fill: '#fff',
      stroke: '#333',
      opacity: 1
    }
  },
  disable: {
    circle: {
      fill: '#333',
      stroke: '#333',
      opacity: 0.2
    },
    pen: {
      fill: '#fff',
      stroke: '#333',
      opacity: 0.2
    }
  }
};

export default class BtnEditGroup extends Component {
  static propTypes = {
    type: PropTypes.string,
  }
  static defaultProps = {
    type: 'normal',
  }
  constructor(props) {
    super(props);
    this.state = {
      config: {
        ...types.normal
      }
    };
  }
  componentWillMount() {
    if (this.props.type) {
      this.changePath(this.props.type);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type) {
      this.changePath(nextProps.type);
    }
  }
  changePath = (type) => {
    switch (type) {
      case 'normal':
        this.setState({
          config: {
            ...types.normal
          }
        });
        break;
      case 'hover':
        this.setState({
          config: {
            ...types.hover
          }
        });
        break;
      case 'press':
        this.setState({
          config: {
            ...types.press
          }
        });
        break;
      case 'disable':
        this.setState({
          config: {
            ...types.disable
          }
        });
        break;
      default:
        break;
    }
  }
  render() {
    const { config } = this.state;
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
        config={config}
      >
        <g id="btn_edit_group_n" transform="translate(-1161 -264)">
          <g id="Ellipse_3" className="cls-1" data-name="Ellipse 3" transform="translate(1161 264)">
            <circle cx="18" cy="18" r="18" className="cls-4" />
            <circle cx="18" cy="18" r="17.5" className="cls-5" />
          </g>
          <path id="Union_3" d="M48.121 18.385v-4.242l4.243 4.243zm.707-4.95L60.143 2.121l4.243 4.243-11.315 11.314zM60.849 1.414l.707-.706a1 1 0 0 1 1.414 0l2.83 2.827a1 1 0 0 1 0 1.415l-.707.707z" className="cls-2" data-name="Union 3" transform="translate(1121.879 272.586)" />
          <g id="btn_edit_group_n-2" className="cls-3" data-name="btn_edit_group_n" transform="translate(1161 264)">
            <circle cx="18" cy="18" r="18" className="cls-4" />
            <circle cx="18" cy="18" r="17.5" className="cls-5" />
          </g>
        </g>
      </Svg>
    );
  }
}
