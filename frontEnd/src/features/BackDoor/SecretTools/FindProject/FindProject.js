import React, { useState, useEffect } from 'react';
import { Container, Row, Col, } from 'reactstrap';
import styled from 'styled-components';
import _isEmpty from 'lodash/isEmpty';
import { NavLink } from 'react-router-dom';
import { store } from '~~store';
import Resource from '~~apis/resource';
import Select from '~~elements/Select';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import Pagination from '~~elements/Pagination';
import GreenCircleCheckBox from '~~elements/GreenCircleCheckBox';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';

const LinkDiv = styled(NavLink)`
  &:hover {
    text-decoration: none;
  }
  div {
    color: #30A9DE;
    transition: .3s ease all;  
    &:hover {
      cursor: pointer;
      color: #090707;
      transition: .3s ease all;
    }
  }
`;

const PAGE_OFFSET = 100;

function FindProject() {
  const [datas, setDatas] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [page, setPage] = useState(1);
  const [ddl, setDdl] = useState({ formats: [], productTypes: [] });
  const [productType, setPt] = useState({ label: 'NB', value: 'NB' });
  const [format, setFormat] = useState({ label: 'housing-metal', value: 'housing-metal' });
  const [isEMDM, setEMDM] = useState({ label: 'All', value: null });
  const [order, setSorter] = useState({ field: 'project_id', asc: false });

  // 是eMDM的
  const checked = (value) => <GreenCircleCheckBox isCheck={value} />;

  // 取出需要修改格式的資料
  const getDatas = async () => {
    store.dispatch(LoadingActions.toggleLoadingStatus(true));
    try {
      const params = {
        productType: productType.value,
        format: format.value,
        isEMDM: isEMDM.value,
        page,
        offset: PAGE_OFFSET,
        order: order.field,
        asc: order.asc,
      };
      const { data: { list, count, formats, productTypes } } = await Resource.BackDoorResource.findProjects(params);
      setDatas(list);
      setDataLength(count);
      setDdl({ formats: formats.map(d => ({ label: d, value: d })), productTypes: productTypes.map(d => ({ label: d, value: d })) });
    } catch (error) {
      store.dispatch(NotificationSystemActions.pushNotification({
        message: 'Get list fail.',
        level: 'error',
      }));
    } finally {
      store.dispatch(LoadingActions.toggleLoadingStatus(false));
    }
  };


  useEffect(() => {
    getDatas();
  }, [JSON.stringify(order), page]);

  // 排序
  const handleTableChange = (pagination, filters, tableSorter) => {
    if (!_isEmpty(tableSorter)) {
      const { order: antdOrder, field } = tableSorter;
      setSorter({ field, asc: antdOrder === 'ascend' });
    }
    if (pagination >= 1) {
      setPage(pagination);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          {/* Product type */}
          <Select
            placeholder="Product type"
            target="box"
            resetable
            options={ddl.productTypes}
            value={productType}
            onChange={setPt}
          />
        </Col>
        <Col>
          {/* partlist */}
          <Select
            placeholder="partlist"
            target="box"
            resetable
            options={ddl.formats}
            value={format}
            onChange={setFormat}
          />
        </Col>
        <Col>
          {/* Product type */}
          <Select
            placeholder="isEMDM"
            target="box"
            resetable
            options={[{ label: 'All', value: null }, { label: 'eMDM', value: true }, { label: 'ME', value: false }]}
            value={isEMDM}
            onChange={setEMDM}
          />
        </Col>
        <Col>
          <Button round onClick={getDatas}>搜尋</Button> Total: {dataLength} record(s)
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Pagination
              pageSize={100}
              total={dataLength}
              currentPage={page}
              onChange={handleTableChange}
            />
          </Row>
          <Row>
            <Table
              headerColor="blue"
              hoverColor="blue"
              pagination={false}
              onChange={handleTableChange}
              columns={[
              {
                dataIndex: 'project_id',
                title: 'project_id',
                sorter: true,
              },
              {
                dataIndex: 'project_name',
                title: 'project_name',
                sorter: true,
                // 這裡要變成網址
                render: (val, row) => {
                  const url = row['project_source'] === 'EMDM'
                    ? `/g/emdmBomDetail/${row['project_id']}`
                    : `/g/Bomdetail/${row['project_id']}`;
                  return (
                    <LinkDiv to={url} target="_blank">
                      <div>{val}</div>
                    </LinkDiv>);
                }
              },
              {
                dataIndex: 'version_name',
                title: 'version',
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
                render: (val) => (val ? checked(true) : '')
              },
              {
                dataIndex: 'ctgy1',
                title: 'ctgy1',
                sorter: true,
              },
              {
                dataIndex: 'ctgy2',
                title: 'ctgy2',
                sorter: true,
              },
              {
                dataIndex: 'bom_item_id',
                title: 'bom_item_id',
                sorter: true,
              }
            ]}
              dataSource={datas}
            />
          </Row>
          <Row>
            <Pagination
              pageSize={100}
              total={dataLength}
              currentPage={page}
              onChange={handleTableChange}
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default FindProject;
