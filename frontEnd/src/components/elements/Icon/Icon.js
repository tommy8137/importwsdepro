/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  pointer-events: ${p => (p.disabled ? 'none' : 'inherit')};
  width: ${p => p.size};
  height: auto;
  transition: .2s ease all;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : '')};
  svg {
    display: block;
    width:100%;
    opacity: ${p => (p.disabled ? 0.3 : 1)};
  }

  :hover {
    opacity: ${p => (p.onClick ? 0.65 : 1)};
    cursor: ${p => (p.onClick ? 'pointer' : 'inherit')};
  }
`;

function Icon(props) {
  const [IconElement, setIconElement] = useState(null);

  useEffect(() => {
    if (props.icon) {
      getIconComponent(props.icon);
    }
  }, [props.icon]);

  // if (!IconElement) return <div {...props}>{props.icon}</div>;
  if (!IconElement) return null;
  return (
    <IconContainer
      {...props}
      className={getClassName()}
      dangerouslySetInnerHTML={{ __html: IconElement }}
    />
  );

  function getIconComponent(icon) {
    import(`../../../static/Icon2/${icon}.svg`)
      .then(component => {
        setIconElement(component.default);
      })
      .catch(error => {
        console.log(error);
        setIconElement(null);
      });
  }

  function getClassName() {
    return props.className ? `icon ${props.className}` : 'icon';
  }
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.string,
  disabled: PropTypes.bool,
};

Icon.defaultProps = {
  size: '24px',
  disabled: false,
  className: '',
};

export default Icon;
