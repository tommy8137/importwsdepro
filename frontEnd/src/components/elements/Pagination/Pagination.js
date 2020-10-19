// http://react-component.github.io/pagination/examples/jumper.html
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import Icon, { IconName } from '~~elements/Icon';
import styles from './PaginationStyles';

class CustomPagination extends Component {
  static propTypes = {
    // 一頁要呈現幾筆資料
    pageSize: PropTypes.number,
    // 資料的總數
    total: PropTypes.number,
    // 目前在的頁數
    currentPage: PropTypes.number,
    // 會回傳currentPage和pageSize兩個參數
    onChange: PropTypes.func.isRequired
  }
  static defaultProps = {
    pageSize: 10,
    total: 0,
    currentPage: 1
  }
  state = {
    wantPage: '',
    showPagination: true
  }
  /**
   *
   * @param {*} current 目前頁碼
   * @param {*} pageSize 一頁幾筆
   */
  onChange = (current, pageSize) => {
    this.props.onChange(current, pageSize);
  }

  checkIsValid = (term) => {
    const { pageSize, total } = this.props;
    let maxPage = Math.ceil(total / pageSize);
    let schema = yup
      .number('需要一個數字')
      .positive('需要正整數')
      .min(1, '至少要有一')
      .max(maxPage, '超過最大頁數');

    // for debug 顯示錯誤原因
    // try {
    //   schema.validateSync(term);
    // } catch (err) {
    //   console.log('valid err', err.errors);
    // }
    return schema.isValidSync(term);
  }

  handleJumpToPage = (event) => {
    if (event.key === 'Enter') {
      if (!this.state.wantPage) {
        return;
      }
      const jumpPage = this.state.wantPage;
      if (this.checkIsValid(jumpPage) === true) {
        this.setState(() => ({
          wantPage: '',
          showPagination: false
        }), () => {
          this.setState({
            showPagination: true
          });
          this.onChange(jumpPage, this.props.pageSize);
        });
      } else {
        // console.log('不是數字');
        this.setState({
          wantPage: ''
        });
      }
    }
  }

  handleInputChange = (event) => {
    let term = parseInt(event.target.value, 10);
    if (this.checkIsValid(term) === true) {
      this.setState({
        wantPage: term
      });
    } else {
      this.setState({
        wantPage: ''
      });
    }
  }

  render() {
    const { pageSize, currentPage, total } = this.props;
    return (
      <styles.Div>
        <div className="jump-to-page">
          Go to page
          <input type="text" value={this.state.wantPage} onChange={this.handleInputChange} onKeyPress={this.handleJumpToPage} />
        </div>
        <div className="verticle-line" />
        {/* 因為 rc-pagination 沒有提供Go To Page的客製化，所以自己做，再讓Pagination重劃 */}
        {this.state.showPagination ?
          <styles.PaginationStyle
            pageSize={pageSize}
            current={currentPage}
            onChange={this.onChange}
            total={total}
            className="extend-pagination"
            itemRender={(current, type, element) => {
              if (type === 'prev') {
                return <Icon icon={IconName.IcoArrowLeftBlack} size="0.5rem" />;
              }
              if (type === 'next') {
                return <Icon icon={IconName.IcoArrowRightBlack} size="0.5rem" />;
              }
              return element;
            }}
          /> : <div />}
      </styles.Div>
    );
  }
}


export default CustomPagination;
