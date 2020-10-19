import PropTypes from 'prop-types';
import styled from 'styled-components';

const Field = styled.div`
  display: flex;
  flex-direction: ${p => p.type};
  width: ${p => p.width};
  padding: 0 15px 18px 15px;
  position: relative;
`;

Field.propTypes = {
  type: PropTypes.oneOf(['row', 'column']),
  width: PropTypes.string
};

Field.defaultProps = {
  type: 'column',
  width: '100%'
};


export default Field;
