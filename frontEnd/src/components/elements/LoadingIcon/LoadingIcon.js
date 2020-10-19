import React, { Component, useState, useEffect, useRef } from 'react';
import * as R from 'ramda';
import _ from 'lodash';

const LoadingIcon = (props) => {
  return (
    <svg
      width="10rem"
      height="3rem"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="5 16 30 60"
      {...props}
    >
      <g transform="translate(20 50)">
        <circle cx="0" cy="0" r="6" fill="#9DB1DC" transform="scale(0.0694526 0.0694526)">
          <animateTransform attributeName="transform" type="scale" begin="-0.375s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite" />
        </circle>
      </g>
      <g transform="translate(40 50)">
        <circle cx="0" cy="0" r="6" fill="#7A99DC" transform="scale(0.354692 0.354692)">
          <animateTransform attributeName="transform" type="scale" begin="-0.25s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite" />
        </circle>
      </g>
      <g transform="translate(60 50)">
        <circle cx="0" cy="0" r="6" fill="#678DDE" transform="scale(0.711699 0.711699)">
          <animateTransform attributeName="transform" type="scale" begin="-0.125s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite" />
        </circle>
      </g>
      <g transform="translate(80 50)">
        <circle cx="0" cy="0" r="6" fill="#5380DF" transform="scale(0.968904 0.968904)">
          <animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
};


export default LoadingIcon;
