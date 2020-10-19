import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';

export const Tabs = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
`;

export const Tab = styled.div`
  cursor: pointer;
  padding: 0 1rem;
  margin-right: 1rem;
  font-size: 1.2rem;
  line-height: 1.2;
  border-bottom: 2px solid ${({ active }) => (active ? '#aaa' : '#6ca4d6')};
  &:last-child {
    margin-right: 0rem;
  }
`;

export const VersionBox = styled.div`
  .nodata-text {
    text-align: center;
    margin-top: 1.2rem;
    font-size: 1rem;
    color: #555;
  }
  .version-header {
    width: 100%;
    background-color: #7d90a9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 3.5rem;
    padding: 0 1rem;
    > p {
      color: white;
      margin-bottom: 0;
      font-size: 0.85rem;
    }
    >.version-select {
      width: 60%;
    }
  }
  .version-list {
    border: 1px solid #e8e8e8;
    overflow: hidden;
    overflow-y: auto;
    height: 18rem;
    max-height: 100%;
    transform: translate(0px, 0px);
    .radio {
      .radio-label {
        margin-bottom: 0;
      }
    }
    .version-title{
      border-bottom: 1px solid #e8e8e8;
      padding: 0.5rem 1rem;
      background-color: white;
      cursor: pointer;
      p {
        margin-bottom:0;
        margin-left: 2rem;
      }
    }
    .version-detail {
      background-color: #f0f0f0;
      .version-item {
        border-bottom: 1px solid #e8e8e8;
        padding: 0.4em 1rem;
        cursor: pointer;
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
`;
