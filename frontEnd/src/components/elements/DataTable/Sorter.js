import React, { Component, Fragment } from 'react';
import styled from 'styled-components';


const Order = styled.span`
  &.order {
    margin-left: 0.4rem;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;

    /* 三角形的樣式
    .dropdown > .caret {
      border-top: 4px dashed;
      border-bottom: 0;
    }
    .dropup > .caret {
      border-top: 0;
      border-bottom: 4px dashed;
    }
    .caret {
      display: inline-block;
      width: 0;
      height: 0;
      margin-left: 2px;
      vertical-align: middle;
      border-right: 4px solid transparent;
      border-left: 4px solid transparent;
    } */

    /* 箭頭型的樣式 */
    .dropdown > .caret {
      transform: translateY(-3px) rotate(45deg);
    }
    .dropup > .caret {
      transform: translateY(0px) rotate(-135deg);
    }
    .caret {
      border: solid;
      border-width: 0 3px 3px 0;
      display: inline-block;
      padding: 3px;
      border-color: #333333;
    }
  }
`;


const SorterContext = React.createContext();

function SorterConsumer(props) {
  return (
    <SorterContext.Consumer {...props}>
      {context => {
        if (!context) {
          throw new Error(
            'Sorter compound components cannot be rendered outside the Sorter component',
          );
        }
        return props.children(context);
      }}
    </SorterContext.Consumer>
  );
}

export default class Sorter extends Component {
  static Desc = ({ children }) => (
    <SorterConsumer>
      {({ sortable, sortOrder, toggle }) =>
        (
          sortable && sortOrder === 'desc' ?
            (
              <span className="dropdown">
                <span className="caret" />
              </span>
            )
            : <span />
        )
      }
    </SorterConsumer>
  )
  static Asc = ({ children }) => (
    <SorterConsumer>
      {({ sortable, sortOrder, toggle }) =>
        (
          sortable && sortOrder === 'asc' ?
            (
              <span className="dropup">
                <span className="caret" />
              </span>
            )
            : <span />
        )
      }
    </SorterConsumer>
  )

  static Initial = props => (
    <SorterConsumer>
      {({ sortable, sortOrder }) => (
        sortable && sortOrder === null ?
          <span className="dropup">
            <span className="caret" />
          </span>
          : <span />
      )}
    </SorterConsumer>
  )

  render() {
    const sortInfo = {
      sortable: this.props.sortable,
      sortOrder: this.props.sortOrder,
    };
    return (
      <SorterContext.Provider value={sortInfo} className="order">
        <Order className="order">
          {this.props.children}
        </Order>
      </SorterContext.Provider>
    );
  }
}
