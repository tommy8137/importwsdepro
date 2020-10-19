import React, { useState, useEffect } from 'react';
import { Container, Row, Col, } from 'reactstrap';
import _cloneDeep from 'lodash/cloneDeep';
import _remove from 'lodash/remove';
import _orderBy from 'lodash/orderBy';
import { store } from '~~store';
import Resource from '~~apis/resource';
import Button from '~~elements/Button';
import Checkbox from '~~elements/Checkbox';
import Table from '~~elements/Table';
import GreenCircleCheckBox from '~~elements/GreenCircleCheckBox';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';


function HousingMetal() {
  const [datas, setDatas] = useState([]);
  const [oriData, setOriData] = useState([]);
  const [selectList, setSelectList] = useState([]);

  // 是eMDM的
  const checked = (value) => <GreenCircleCheckBox isCheck={value} />;

  // 取出需要修改格式的資料
  const getDatas = async () => {
    store.dispatch(LoadingActions.toggleLoadingStatus(true));
    try {
      const { data } = await Resource.BackDoorResource.getMetalList();
      setDatas(data);
      setOriData(data);
    } catch (error) {
      store.dispatch(NotificationSystemActions.pushNotification({
        message: 'Get all NB metal list fail.',
        level: 'error',
      }));
    } finally {
      store.dispatch(LoadingActions.toggleLoadingStatus(false));
    }
  };

  // 轉格式
  const updateData = async (ids) => {
    store.dispatch(LoadingActions.toggleLoadingStatus(true));
    try {
      await Resource.BackDoorResource.updateMetalList({ ids });
      store.dispatch(NotificationSystemActions.pushNotification({
        message: 'Done.',
        level: 'success',
      }));
    } catch (error) {
      store.dispatch(NotificationSystemActions.pushNotification({
        message: 'Get all NB metal list fail.',
        level: 'error',
      }));
    } finally {
      store.dispatch(LoadingActions.toggleLoadingStatus(false));
      getDatas();
      setSelectList([]);
    }
  };


  useEffect(() => {
    getDatas();
  }, []);

  // 全選
  const handleSelectAll = () => {
    const list = datas.filter(d => !d.done).map(d => d.bom_item_id);
    setSelectList(list);
  };
  // 更新
  const handleUpdate = () => {
    updateData(selectList.join(','));
  };
  // 排序
  const handleTableChange = (pagination, filters, sorter) => {
    const { order, field } = sorter;
    const { done = [], project_source: source = [] } = filters;
    // done filter
    const doneFilter = (d) => {
      if (done.length === 1) {
        return d['done'] === !!done[0];
      }
      return true;
    };

    // isEMDM filter
    const sourceFilter = (d) => {
      if (source.length === 1) {
        return source[0] === !!d['project_source'];
      }
      return true;
    };
    const tableOrder = order === 'ascend' ? 'asc' : 'desc';
    const data = _orderBy(oriData, [field], [tableOrder])
      .filter(doneFilter)
      .filter(sourceFilter);
    setDatas(data);
  };

  return (
    <Container>
      <Row>
        <Button onClick={handleSelectAll}>全選 {datas.filter(d => !d.done).length}</Button>
        <Button onClick={handleUpdate} disabled={!selectList.length}>更新 ({selectList.length})</Button>
      </Row>
      <Row>
        <Col>
          {selectList.join(',')}
          <Table
            headerColor="blue"
            hoverColor="blue"
            pagination={false}
            filterMultiple={false}
            onChange={handleTableChange}
            columns={[
              {
                dataIndex: 'done',
                title: 'done',
                sorter: true,
                filters: [
                  {
                    text: 'N',
                    value: false,
                  },
                  {
                    text: 'Y',
                    value: true,
                  },
                ],
                render: (val, row, index) => (val ? 'Y' :
                <Checkbox
                  checked={selectList.includes(row['bom_item_id'])}
                  onChange={e => {
                    const id = row['bom_item_id'];
                    if (!e.target.checked) {
                      const list = _cloneDeep(selectList);
                      _remove(list, (item) => item === id);
                      setSelectList(list);
                    } else {
                      setSelectList(selectList.concat(id));
                    }
                  }}
                />)
              },
              {
                dataIndex: 'project_id',
                title: 'project_id',
                sorter: true,
              },
              {
                dataIndex: 'project_name',
                title: 'project_name',
                sorter: true,
              },
              {
                dataIndex: 'version_name',
                title: 'version_name',
                sorter: true,
              },
              {
                dataIndex: 'bom_item_id',
                title: 'bom_item_id',
                sorter: true,
              },
              {
                dataIndex: 'part_name',
                title: 'part_name',
                sorter: true,
              },
              {
                dataIndex: 'project_source',
                title: 'eMDM',
                sorter: true,
                filters: [
                  {
                    text: 'N',
                    value: false,
                  },
                  {
                    text: 'Y',
                    value: true,
                  },
                ],
                render: (val) => (val ? checked(true) : '')
              },
            ]}
            dataSource={datas}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default HousingMetal;
