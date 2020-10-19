import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';

const CustomNavLink = styled(NavLink)`
  & {
    color: #000;
    text-decoration: none;
    &:hover {
      color: #000;
      text-decoration: none;
    }
    &:focus {
      outline: none;
    }
  }
`;

export default CustomNavLink;
