import React, { Fragment, useRef } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Icon, { IconName } from '~~elements/Icon';
import { EnhancePopover } from '~~elements/Popover';
import { history } from '~~store';

const Btns = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  color: rgb(103, 124, 148);
  font-size: 0.9rem;
  border-radius: 4px;
  letter-spacing: 0.5px;
  margin: 0.2rem 0rem;
  transition: .3s ease all;
  cursor: pointer;
  &:hover{
    color: rgb(27, 87, 140);;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    text-decoration: none;
  }
`;

const RouterMenu = (props) => {
  const cellEl = useRef(null);
  const {
    isMenuOpen,
    setMenu,
    routerList,
    activeProductType,
  } = props;


  function handleRedirect(item) {
    const searchParams = Object.keys(activeProductType).reduce((prev, curr) => {
      if (activeProductType[curr]) { prev.set(curr, activeProductType[curr]); }
      return prev;
    }, new URLSearchParams());

    // 把product type存到search裡
    history.push({
      pathname: item.routerName,
      search: `?${searchParams.toString()}`
    });
  }

  return (
    <Fragment>
      <div ref={cellEl}>
        <Icon icon="IcoSetting1" size="1.6rem" onClick={() => setMenu(true)} />
      </div>
      {cellEl ?
        (
          <EnhancePopover
            closeBtn={false}
            placement="left"
            target={cellEl}
            onClickOutside={() => setMenu(false)}
            toggle={() => setMenu(!isMenuOpen)}
            isOpen={isMenuOpen}
          >
            前往
            {
              routerList.map(item => (
                <Btns
                  onClick={() => handleRedirect(item)}
                  onKeyUp={() => { }}
                >
                  {item.name}
                </Btns>
              ))
            }
          </EnhancePopover>
          ) : null}
    </Fragment>
  );
};

RouterMenu.defaultProps = {
  routerList: [],
  activeProductType: {},
};
const mapStateToProps = (state) => ({
  activeProductType: state.dataBase.common.activeProductType,
});

const mapDispatchToProps = {
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(RouterMenu);

