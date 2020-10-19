import React, { useState, useEffect } from 'react';
import { Input, Alert, Container, Row, Col, } from 'reactstrap';
import { compose } from 'recompose';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import { connect } from 'react-redux';
import Resource from '~~apis/resource';
import { store, history } from '~~store';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import * as EEbomAssignmentActions from '~~features/Setting/EEbomAssignment/EEbomAssignmentActions';

function EeBom(props) {
  const [idPIC, setIdPIC] = useState('10700001');
  const [idProxy, setIdProxy] = useState('10700001');
  const [namePIC, setNamePIC] = useState('ADMIN');
  const [nameProxy, setNameProxy] = useState('ADMIN');
  const [invalid, setInvalid] = useState(false);
  const FIELD = {
    list: 'list',
    namePIC: 'namePIC',
    nameProxy: 'nameProxy',
  };

  useEffect(() => {
    props.getEEbomList();
  }, []);

  useEffect(() => {
    if (props.list.length === 0) {
      setInvalid(FIELD.list);
    } else {
      setInvalid(false);
    }
  }, [JSON.stringify(props.list)]);

  const getEmpName = async (id, key) => {
    let result = '';
    store.dispatch(LoadingActions.toggleLoadingStatus(true));
    try {
      const { data: { userList } } = await Resource.SettingResource.searchUsers(id);
      result = userList[0].value;
      setInvalid(false);
    } catch (error) {
      setInvalid(key);
      result = '查無此人或沒有權限';
    } finally {
      if (key === FIELD.namePIC) {
        setNamePIC(result);
      } else {
        setNameProxy(result);
      }
      store.dispatch(LoadingActions.toggleLoadingStatus(false));
    }
  };

  const handleEdit = e => {
    const { list } = props;

    const promiseList = list.map(d => new Promise((resolve, reject) => {
      try {
        const value = Resource.SettingResource.updateUsers({
          pic: namePIC,
          pic_emplid: idPIC,
          proxy: nameProxy,
          proxy_emplid: idProxy,
          type1: d.type1,
        });
        resolve(value);
      } catch (error) {
        reject(error);
      }
    }));
    store.dispatch(LoadingActions.toggleLoadingStatus(true));
    Promise.all(promiseList).then(values => {
      console.log(values);
      props.getEEbomList();
      store.dispatch(LoadingActions.toggleLoadingStatus(false));
      store.dispatch(NotificationSystemActions.pushNotification({ message: '改好辣', level: 'success' }));
    }).catch(reason => {
      console.log(reason);
      store.dispatch(LoadingActions.toggleLoadingStatus(false));
      store.dispatch(NotificationSystemActions.pushNotification({ message: '改失敗惹', level: 'error' }));
    });
  };

  return (
    <Container>
      <Row>
        <Col sm={{ size: 3 }}>
          <Row>
            PIC:
            <Input
              value={idPIC}
              onChange={e => setIdPIC(e.target.value)}
              onBlur={e => getEmpName(idPIC, FIELD.namePIC)}
              invalid={invalid === FIELD.namePIC}
            />
          </Row>
          <Row>{namePIC}</Row>
        </Col>
        <Col sm={{ size: 3 }}>
          <Row>
            Proxy:
            <Input
              value={idProxy}
              onChange={e => setIdProxy(e.target.value)}
              onBlur={e => getEmpName(idProxy, FIELD.nameProxy)}
              invalid={invalid === FIELD.nameProxy}
            />
          </Row>
          <Row>{nameProxy}</Row>
        </Col>
        <Col sm={{ size: 2 }}>
          <Button
            onClick={handleEdit}
            disabled={invalid}
          >
            修改全部PIC和Proxy
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table
            headerColor="blue"
            hoverColor="blue"
            pagination={false}
            columns={[
              {
                dataIndex: 'type1',
                title: 'type1',
                sorter: true,
              },
              {
                dataIndex: 'type2',
                title: 'type2',
                sorter: true,
              },
              {
                dataIndex: 'pic_emplid',
                title: 'pic_emplid',
                sorter: true,
              },
              {
                dataIndex: 'proxy_emplid',
                title: 'proxy_emplid',
                sorter: true,
              },
            ]}
            dataSource={props.list}
          />
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    list: state.eebomAssignment.eeBomList,
  };
};

const mapDispatchToProps = {
  getEEbomList: EEbomAssignmentActions.getEEbomList,
  updateUsers: EEbomAssignmentActions.updateUsers,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(EeBom);
