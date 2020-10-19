import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { eeBomInfoFontColor } from '~~styles/_variables';


const InfoWrapper = styled.div`
  &.info {
    display: flex;
    align-items: flex-end;
    .info__box {
      margin: 0 1rem;
      max-width: ${props => props.maxWidth};
      text-align: ${props => props.textAlign};
      &__title {
        color: ${eeBomInfoFontColor};
        font-size: 0.8rem;
        white-space : nowrap;
        display: flex;
        flex-direction: column;
        & p {
          margin: 0;
        }
      }
      &__content {
        margin: 0;
        font-size: 1.2rem;
        font-weight: bolder;
        overflow : hidden;
        text-overflow : ellipsis;
        white-space : nowrap;
      }
    }
  }
`;

const ClickableContent = styled.p`
  text-decoration: underline;
  cursor: pointer;
`;

function Info(props) {
  return (
    <InfoWrapper
      className="info"
      maxWidth={props.maxWidth}
      textAlign={props.textAlign}
    >
      <div className="info__box">
        <div className="info__box__title">{props.title}</div>
        {
          props.onContentClick ? (
            <ClickableContent className="info__box__content" onClick={props.onContentClick}>{props.content}</ClickableContent>
          ) : (<p className="info__box__content">{props.content}</p>)
        }
      </div>
    </InfoWrapper>
  );
}


Info.defaultProps = {
  textAlign: 'left',
  maxWidth: null,
  projectDetail: null
};

Info.propTypes = {
  // 文字對齊的方向
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  maxWidth: PropTypes.string,
  // 上方的小字
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  // 下方的內容
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  projectDetail: PropTypes.shape({}),
};

export default Info;
