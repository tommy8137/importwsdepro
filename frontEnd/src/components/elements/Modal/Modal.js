import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';


const StyledModal = styled(Modal)`
  min-width: ${props => mappingWidth(props.widthType)};
  .modal-content{
    max-height: 43rem;
    @media (min-height: 800px) {
        max-height: calc(100vh - 10rem);
      };
  }

  /* Header Style */
  .modal-header {
    background-color: #ffffff;
    border-bottom: 1px solid #f4f6fa;
    padding: 1rem 3rem;
  }

  /* Body Style */
  .modal-body {
    background-color: #ffffff;
    padding: ${props => (props.moreSpace ? '5rem 2.5rem' : '1.25rem 2.5rem 2.5rem')};
    overflow: auto;
    visibility: visible;
    opacity: 1;
    transition: .3s ease all;
  }

  /* Footer Style */
  .modal-footer {
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #f4f6fa;
    padding: 1.25rem 2rem;
    button {
      margin: 0rem 0.625rem;
    }
  }
`;

function mappingWidth(widthType) {
  let width;
  switch (widthType) {
    case 'large':
      width = '67.5rem';
      break;
    case 'middle':
      width = '56.25rem';
      break;
    case 'small':
      width = '38.125rem';
      break;
    default:
      width = '38.125rem';
      break;
  }
  return width;
}

StyledModal.propTypes = {
  widthType: PropTypes.oneOf(['large', 'middle', 'small']),
  moreSpace: PropTypes.bool
};

StyledModal.defaultProps = {
  /** 寬度 */
  widthType: 'small',
  /** 是否需要大的padding */
  moreSpace: false,
};

export default StyledModal;
