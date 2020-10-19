import React, { useRef, Fragment } from 'react';
import styled from 'styled-components';
import Paragraph from '~~elements/Paragraph';
import { EnhancePopover } from '~~elements/Popover';

/**
 * 超過會...的文字 + 點了會有popover
 */

const ParagraphWrap = styled.div`
  display: inline-block;
  max-width: 100%;
`;
const ParagraphTooltipStyle = styled(Paragraph)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const PopoverContent = styled.div`
  .title {
    font-weight: 500;
    margin: 0;
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
    margin-top: 0.5rem;
    &:first-child {
      margin-top: 0;
    }
  }
  p {
    margin: 0;
  }
`;

const ParagraphTooltip = props => {
  const textEl = useRef(null);
  const { val, content } = props;

  return (
    <React.Fragment>
      <ParagraphWrap innerRef={textEl} onClick={e => e.stopPropagation()} onKeyDown={() => { }}>
        <ParagraphTooltipStyle {...props} >
          {val}
        </ParagraphTooltipStyle>
      </ParagraphWrap>
      <EnhancePopover target={textEl} placement="bottom-end" closeBtn>
        <PopoverContent>
          {content}
        </PopoverContent>
      </EnhancePopover>
    </React.Fragment>
  );
};

ParagraphTooltip.defaultProps = {
  /** 需要點點點的行數, 預設一行超過就點點點 */
  ellipsis: { rows: 1 },
  /** 要顯示的文字 */
  val: '',
  /** 要render的tooltip內容 */
  content: '',
};

export default ParagraphTooltip;
