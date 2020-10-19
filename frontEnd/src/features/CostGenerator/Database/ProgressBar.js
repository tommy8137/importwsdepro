import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
  top: -10%;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  opacity: 0;
  z-index: 999;
  /* background: rgba(0,0,0,0.2); */
  justify-content: center;
  align-items: center;
  visibility: hidden;
  transition: .3s ease all;
  &.active {
    top: 0;
    opacity: 1;
    visibility: visible;
    transition: .4s ease all;
  }
  .body {
    color: #fff;
    width: 30rem;
    min-height: 16rem;
    border-radius: 4px;
    box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.38);
    border: solid 1px #1e1e1e;
    background-color: #333;
    display: flex;
    // justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;

    .content {
      width: 100%;
      min-height: 60%;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      .row {
        display: flex;
        min-height: 4rem;
        width: 100%;
        justify-content: space-around;
        align-items: center;
        margin-top: 1rem;
        letter-spacing: 1px;
        /* 矯正被bootstrap覆蓋的style */
        margin-left: 0;
        margin-right: 0;
        padding: .5rem 3rem;
      }
    }
  }
`;

const Div = styled.div`
margin-top: 2.5rem
display: flex;
flex-direction: column;
align-items: center;

.trail{
  position: relative;
  height: 0.8rem;
  width: 26rem;
  border-radius: 1rem;
  background: #1b1b1b;
  box-shadow: 0 2px 0 0 #444444;
}

.filler{
  height: 100%;
  border-radius: inherit;
  box-shadow: 0 0.5rem 1rem 0 rgba(245, 201, 16, 0.2);
  background-image: linear-gradient(to left, #ffd41e, #f3b200);
  border: 2px solid #1b1b1b;
  transition: width .3s ease-in;
}

.text {
  display: flex;
  min-height: 3rem;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: #939393;
  font-size: 0.8rem;
  letter-spacing: 1px;

  p{
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 0.4rem;
    color: #f5c910;
  }

`;

export default class ProgressBar extends Component {
    // static propTypes= {
    //   /** true | false */
    //   isOpen: PropTypes.bool,
    // }

    // static defaultProps = {
    //   isOpen: false,
    // };

    state = {
      percentage: 0,
      isOpen: false,
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.isOpen === true) {
        this.setState({ isOpen: true });
      }
      if (nextProps.percentage !== this.props.percentage) {
        this.setState({ percentage: nextProps.percentage });
        if (nextProps.percentage === 100) {
          setTimeout(this.setState({ isOpen: false }), 1000);
        }
      }
    }


    render() {
      const { isOpen } = this.state;
      // console.log('bar >>>', this.state);
      return (
        <Wrapper className={isOpen ? 'active' : ''}>
          <div className="body">
            <div className="content">
              <div className="row">File Upload</div>
              <Div>
                <div className="trail">
                  <div
                    className="filler"
                    style={{ width: `${this.state.percentage}%` }}
                  />
                </div>
                <div className="text">
                  Progressing ... <p>{`${this.state.percentage}%`}</p>
                </div>
              </Div>
            </div>
          </div>
        </Wrapper>
      );
    }
}
