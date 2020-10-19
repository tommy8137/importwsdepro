import React, { useRef, Fragment } from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

/**
 * 超過會...的文字
 * ant design的 Paragraph 多墊一層
 */
const ParagraphStyle = styled(Typography.Paragraph)`
  &.ant-typography-ellipsis-single-line {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &.ant-typography-ellipsis-multiple-line {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    /*! autoprefixer: ignore next */
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const Paragraph = props => {
  return (
    <ParagraphStyle {...props} >
      {props.children}
    </ParagraphStyle>
  );
};

export default Paragraph;
