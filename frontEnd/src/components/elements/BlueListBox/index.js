import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';

import Searchbar from './BlueListBoxSearchbar';

// 整體的padding
const ROW_PADDING = '0.4rem 0.6rem;';

export const BlueListBoxSearchbar = Searchbar;

// 最外層的框框
export const BlueListBoxWrap = styled.div`
 border: 1px solid #aaa;
`;

// 橫的row, 內含框框
export const BlueListBoxRow = styled.div`
  padding: ${ROW_PADDING};
  font-size: 0.85rem;
  border-bottom: 1px solid #aaa;
  &:last-child {
    border-bottom: 0;
  }
`;

// 最下方list的框框
export const BlueListBoxList = styled.div`
  padding: ${ROW_PADDING};
  height: 15rem;
  overflow: hidden;
  overflow-y: auto;
`;

// box裡面的藍色背景title
export const BlueListBoxTitle = styled.div`
  padding: ${ROW_PADDING};
  font-size: 0.85rem;
  border-bottom: 1px solid #aaa;
  background-color: #7890ab;
  color: white;
`;
