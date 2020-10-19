import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '~~elements/Button';
import Icon, { IconName } from '~~elements/Icon';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .icon {
    width: 40%;
  }
  .btn {
    margin-top: 2rem;
  }
`;

export default class NoData extends Component {
  render() {
    return (
      <foreignObject x="0" y="60" width={1088} height={560}>
        <Wrapper>
          <Icon icon={IconName.IcoNoData} />
            No data here !!
          <Button color="black" onClick={this.props.onRetry}>TRY AGAIN</Button>

        </Wrapper>
      </foreignObject>
    );
  }
}
