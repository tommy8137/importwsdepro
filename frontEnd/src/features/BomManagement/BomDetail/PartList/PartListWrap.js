import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _get from 'lodash/get';
import CheckingRbac from '~~hoc/CheckingRbac';
import Icon from '~~elements/Icon';
import Table from '~~elements/DataTable';
import PartlistResource from '~~apis/resource/PartlistResource';
import PreviewImage from '~~elements/PreviewImage';
import TableHeaderColumn from '~~elements/DataTable/TableHeaderColumn';
import { PartlistContextProvider } from '~~elements/PartListForm';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import Resource from '~~apis/resource';
import * as BomDetailActions from '~~features/BomManagement/BomDetail/BomDetailActions';
import PartListModal from './PartListModal';
import * as PartlistActions from './PartlistActions';

const Div = styled.div`
  border-top: 1px solid #d7d7d7;
  padding-bottom: 4rem;
  margin: 0.875rem 0;
  height: ${props => props.height}px;
  overflow: hidden;
  overflow-y: scroll;
  height: calc(100vh - 300px);
  .group {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    &--title {
      margin-left: 1.875rem;
      font-size: 1.125rem;
      font-weight: bolder;
      margin-bottom: 0.75rem;
    }

    /* 為了覆蓋Table元件裡style component加的css */
    &--table {
      & > div {
        width: 100%;
      }
    }

  }
  .table-thead {
    padding: unset;
    font-size: 0.875rem;
    color: #ffffff;
    opacity: 1;
    background-color: #7c90a9;
    height: 2.75rem;
    line-height: 2.75rem;

    .table-tr {
      border: 1px solid #d7d7d7;
      padding: 0 1.875rem;
    }
    .table-th {
      padding-right: .5rem;
      /* padding: 0rem 1.875rem; */
      &.part_name {
        max-width: 22%;
      }
      &.ref_part_num {
        max-width: 15%;
      }
      &.material_spec {
        max-width: 22%;
      }
      &.material {
        max-width: 18%;
      }
      &.image_path {
        max-width: 8%;
        padding-left: 0.2rem;
      }
      &.update_time {
        max-width: 15%;
      }
    }
  }
  .table-td {
    /* padding: 0rem 1rem; */
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding-right: .5rem;
    &.part_name {
        max-width: 22%;
      }
      &.ref_part_num {
        max-width: 15%;
      }
      &.material_spec {
        max-width: 22%;
      }
      &.material {
        max-width: 18%;
      }
      &.image_path {
        max-width: 8%;
        padding-left: 0.6rem;
      }
      &.update_time {
        max-width: 15%;
      }
  }
  .table-tbody {
    font-size: 0.9375rem;
    color: #333333;
    background-color: #ffffff;
    .table-tr {
      border: 1px solid #d7d7d7;
      padding: 0 1.875rem;
    }
  }
`;

const ImageIconDiv = styled.div`
  &.check-icon--wrapper {
    display: flex;
    align-items: center;
    height: 100%;
    .icon{
      width: 1.5rem
    }
  }
`;


const Partlist = (props) => {
  const [productTypeList, setProductTypeList] = useState([]);
  const [isEmdmPart, setEmdmPart] = useState(false);

  useEffect(() => {
    getProductTypeList();
    const { bomData: { partItems } } = props;
    if (partItems.length > 0) {
      const compareDate = partItems.filter(group => _get(group, 'partlist', []).length > 0);
      setEmdmPart(!!compareDate[0].partlist[0].source_item_id); // source_item_id will be null when epro
    }
  }, []);

  /**
   * 一開始進來先取得product type 下拉
   */
  async function getProductTypeList() {
    try {
      const { data } = await Resource.PartlistResource.getProductTypeDropdownList();
      setProductTypeList(data);
    } catch (error) {
      setProductTypeList([]);
      console.log('error >>>', error);
    }
  }

  const [previewInfo, setPreviewInfo] = useState({
    imgIdList: [],
    activeIndex: 0,
    image: ''
  });

  const [previewOpen, setPreviewOpen] = useState(false);

  const {
    // state
    bomData,
    bomData: {
      productType = 'NB'
    },
    isPartItemOpen,
    emdmImgList,
    // action
    togglePartItem,
    getRbacPath,
  } = props;
  const denyViewSystemCost = getRbacPath(['View', 'deny', 'me_bom_projects.bom_item.system_cost']);

  useEffect(() => {
    if (!isPartItemOpen) {
      props.resetEmdmBomImage();
      setPreviewInfo({
        ...previewInfo,
        activeIndex: 0,
        image: null,
        imgIdList: [],
      });
      setPreviewOpen(false);
    }
  }, [isPartItemOpen]);

  useEffect(() => {
    if (emdmImgList.length > 0) {
      setPreviewInfo({
        ...previewInfo,
        activeIndex: 0,
        image: emdmImgList[0].url,
        imgIdList: emdmImgList.map(d => d.url),
      });
    }
  }, [JSON.stringify(emdmImgList)]);


  const getColumnHeaders = () => {
    const headerBase = [
      { dataIndex: 'part_name', key: 'part_name', title: 'Part Name', sortable: false, sortOrder: null },
      { dataIndex: 'part_number', key: 'part_number', title: 'Part Number', sortable: false, sortOrder: null },
      { dataIndex: 'material_spec', key: 'material_spec', title: 'Material Spec.', sortable: false, sortOrder: null },
      { dataIndex: 'material', key: 'material', title: 'Material', sortable: false, sortOrder: null },
      { dataIndex: 'image_path', key: 'image_path', title: 'Image', sortable: false, sortOrder: null },
      { dataIndex: 'system_cost', key: 'system_cost', title: 'Clean Sheet Cost', sortable: false, sortOrder: null },
      { dataIndex: 'update_time', key: 'update_time', title: 'Update Time', sortable: false, sortOrder: null },
    ];

    return denyViewSystemCost ?
      headerBase.filter(item => item.key !== 'system_cost') :
      headerBase;
  };


  const handleClick = (row, type1, type2) => {
    const { formate, id: bomId, } = row;
    const productTypeId = productTypeList.reduce((prev, curr) => (curr.label === productType ? curr.value : prev), '1');
    const partlistName = `${formate.toLowerCase()}`;
    const productTypeName = productType.toLowerCase();
    props.getPartItemData({ partlistName, bomId, type1, type2, productTypeName, productTypeId });
    if (isEmdmPart) {
      props.getEmdmBomImage(row['bom_id'], row['source_item_id'], 'part');
    }
  };

  /**
 *
 * @param {Array} list image list
 * @param {Number} index 第幾個image id
 */
  function handlePreviewImg(list, index) {
    if (isEmdmPart) {
      setPreviewInfo({
        ...previewInfo,
        activeIndex: index,
        image: list[index],
        imgIdList: list,
      });
      setPreviewOpen(true);
    } else {
      getImgById(list, index);
    }
  }

  const handleDownload = () => {
    const img = emdmImgList[previewInfo.activeIndex];
    fetch(img.url, {
      method: 'GET'
    })
      .then(response => {
        response.arrayBuffer().then((buffer) => {
          const imgUrl = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement('a');
          link.href = imgUrl;
          link.setAttribute('download', img.fileName); // or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  function getImgById(imgIdList, index) {
    const apiUrl = `/bom/partlist/getImage/${imgIdList[index]}`;
    PartlistResource.getImageById(apiUrl)
      .then(res => {
        const { data: { values: base64 } } = res;
        setPreviewInfo({
          ...previewInfo,
          activeIndex: index,
          image: base64,
          imgIdList,
        });
        setPreviewOpen(true);
      })
      .catch(error => {
        console.log('取得圖片失敗 >>>', error.response);
        setPreviewInfo({
          ...previewInfo,
        });
        setPreviewOpen(false);
        props.pushNotification({
          message: '取得圖片失敗，請稍候再試',
          level: 'error'
        });
      });
  }


  function handleClickBtnImage(e, cellValue, row) {
    e.stopPropagation();
    if (isEmdmPart) {
      props.getEmdmBomImage(row['bom_id'], row['source_item_id'], 'part');
      setPreviewOpen(true);
    } else {
      getImgById(cellValue, 0);
    }
  }

  function handleClosePreivew(e) {
    setPreviewOpen(false);
    setPreviewInfo({
      activeIndex: 0,
      image: null,
      imgIdList: [],
    });
    props.resetEmdmBomImage();
  }

  return (
    <Div>
      {
        bomData.partItems.map((group, index) => {
          if (_get(group, 'partlist', []).length === 0) {
            return null;
          }
          return (
            <div className="group" key={index}>
              <div className="group--title">{`${group.type1} - ${group.type2}`}</div>
              <div className="group--table">
                <Table rows={group.partlist} headers={getColumnHeaders()}>
                  {({ rows, headers }) => {
                    return (
                      <div className="table">
                        <div className="table-thead">
                          <div className="table-tr">
                            {headers.map(item => {
                              return (
                                <TableHeaderColumn
                                  data={item}
                                  key={item.key}
                                />
                              );
                            })}
                          </div>
                        </div>
                        <div className="table-tbody">
                          {
                            rows.map((row, n) => {
                              const canOpen = row.formate && bomData.editAble && row.hasui;
                              return (
                                <div
                                  className="table-tr"
                                  onClick={() => (canOpen ? handleClick(row, group.type1, group.type2) : {})}
                                  onKeyUp={() => { }}
                                  key={n}
                                >
                                  {row.cells.map(cell => {
                                    // 圖片欄位
                                    if (cell.id === 'image_path') {
                                      const hasImg = (isEmdmPart && row['image']) || cell.value.length > 0;
                                      return (
                                        <div
                                          className={`table-td  ${cell.id}`}
                                          key={cell.id}
                                        >
                                          {hasImg ?
                                            <ImageIconDiv className="check-icon--wrapper">
                                              <Icon
                                                icon="BtnImage"
                                                onClick={(e) => handleClickBtnImage(e, cell.value, row)}
                                              />
                                            </ImageIconDiv>
                                            : ''}
                                        </div>
                                      );
                                    } else if (cell.id === 'system_cost') {
                                      return (
                                        <div
                                          className={`table-td  ${cell.id}`}
                                          key={cell.id}
                                        >
                                          {cell.value}
                                        </div>
                                      );
                                    }
                                    // 一般欄位
                                    return (
                                      <div
                                        className={`table-td  ${cell.id}`}
                                        key={cell.id}
                                      >
                                        {cell.value}
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            })
                          }
                        </div>
                      </div>
                    );
                  }}
                </Table>
              </div>
            </div>
          );
        })
      }
      <PartlistContextProvider>
        <PartListModal
          isOpen={isPartItemOpen}
          toggleModal={togglePartItem}
          denyViewSystemCost={denyViewSystemCost}
        />
      </PartlistContextProvider>
      <PreviewImage
        isOpen={previewOpen}
        isSingle={previewInfo.imgIdList.length === 1}
        imgIdList={previewInfo.imgIdList}
        activeIndex={previewInfo.activeIndex}
        image={previewInfo.image}
        handlePreviewImg={(index) => {
          setPreviewOpen(true);
          handlePreviewImg(previewInfo.imgIdList, index);
        }}
        toggleClose={handleClosePreivew}
        onDownload={handleDownload}
      />
    </Div>
  );
};


const mapStateToProps = (state) => {
  return {
    bomData: state.bomDetail.bomData,
    isPartItemOpen: state.partlist.isPartItemOpen,
    partlistName: state.partlist.partlistName,
    emdmImgList: state.bomDetail.emdmImgList,
  };
};

const mapDispatchToProps = {
  getPartItemData: PartlistActions.getPartItemData,
  togglePartItem: PartlistActions.togglePartItem,
  pushNotification: NotificationSystemActions.pushNotification,
  getEmdmBomImage: BomDetailActions.getEmdmBomImage,
  resetEmdmBomImage: BomDetailActions.resetEmdmBomImage,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  CheckingRbac(),
)(Partlist);

