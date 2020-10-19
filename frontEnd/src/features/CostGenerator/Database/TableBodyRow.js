import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '~~elements/Icon';

const InfoDiv = styled.div`
.info-section {
  position: absolute;
  right: 0.6rem;
  height: 100%;
  display: flex;
  align-items: center;
  .icon {
    width: 1.8rem;
    margin: 0rem 0.3rem;
    cursor: pointer;
  }

  &.hidden {
    display: none
  }
}
`;

export default class TableBodyRow extends Component {
  static propTypes = {
    row: PropTypes.shape({
      cells: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired
        }).isRequired,
      )
    }).isRequired,
    // upload: PropTypes.func.isRequired,
    download: PropTypes.func.isRequired
  }
  state = {
    toggleInfo: false
  }
  /**
   * 滑鼠離開row，就隱藏info icon
   */
  onMouseLeave = () => {
    this.setState(() => ({ toggleInfo: false }));
  }
  /**
   * 滑鼠移進row，就顯示info icon
   */
  onMouseEnter = () => {
    this.setState(() => ({ toggleInfo: true }));
  }

  handleFileOnChange = (tableName, e) => {
    const file = new FormData();
    const doc = e.target.files[0];
    file.append('file', doc);
    this.props.upload(tableName, file);
  }

  render() {
    const { row } = this.props;
    return (
      <div
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        className="table-tr"
        style={{ cursor: 'auto' }}
      >
        {row.cells.map(cell => {
          return (
            <div
              className={`table-td ${cell.id}`}
              key={cell.id}
            >
              {cell.value}
            </div>
          );
        })}
        <InfoDiv>
          <div className={`${this.state.toggleInfo ? 'info-section' : 'info-section hidden'}`}>
            <Icon
              icon="BtnUpdate"
              onClick={() => this.triggerFileInput.click()}
            />
            <input
              type="file"
              accept=".xlsx"
              style={{ display: 'none' }}
              ref={fileInput => { this.triggerFileInput = fileInput; }}
              onChange={(e) => this.handleFileOnChange(row.tableName, e)}
            />
            <Icon icon="BtnDownload" onClick={() => this.props.download(row.tableName)} />
          </div>
        </InfoDiv>
      </div>
    );
  }
}
