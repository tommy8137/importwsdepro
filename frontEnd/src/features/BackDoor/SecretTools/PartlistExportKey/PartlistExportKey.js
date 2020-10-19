import React, { Fragment, useState, useEffect } from 'react';
import ExcelToJson from 'read-excel-file';
import { Input, Container, Row, Col, Button, Alert,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Checkbox from '~~elements/Checkbox';
import Resource from '~~apis/resource';
import { store, history } from '~~store';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';

import { PRODUCT_TYPE } from './constant';
import Helper from './helper';
import FormulasHelper from './formulaHelper';
import FileHelper from './fileHelper';

function PartlistExportKey(props) {
  const [ddlSheepOpen, setSheepOpen] = useState(false);
  const [ddlTypeOpen, setTypeOpen] = useState(false);
  const [ddlPartlistOpen, setddlPartlistOpen] = useState(false);
  const [dropdownList, setDropdownList] = useState([]);
  const [left, setleft] = useState('');
  const [right, setright] = useState('');
  const [file, setFile] = useState(null);
  const [invalid, setInvalid] = useState(false);
  const [selectedType, setType] = useState('');
  const [selectedPartlist, setPartlist] = useState('');
  const [selectedSheet, setSheet] = useState('');
  const [formulaList, setFormulaList] = useState([]);
  const [datas, setDatas] = useState(null);
  const [isDraft, setIsDraft] = useState(false);

  // Eslint逼我的
  const getDatas = async () => {
    store.dispatch(LoadingActions.toggleLoadingStatus(true));
    try {
      const { data } = await Resource.BackDoorResource.getCleansheetExportSettings();
      setDatas(data);
      console.log('data', data);
    } catch (error) {
      setInvalid('Get all export setting fail.');
      store.dispatch(NotificationSystemActions.pushNotification({
        message: 'Get all export setting fail.',
        level: 'error',
      }));
    } finally {
      store.dispatch(LoadingActions.toggleLoadingStatus(false));
    }
  };

  useEffect(() => {
    getDatas();
  }, []);

  useEffect(() => {
    if (!selectedType || !selectedPartlist || !selectedSheet) {
      setInvalid('請先選擇prodcut type、partlist、sheet');
    } else {
      setInvalid('');
    }
  }, [selectedType, selectedPartlist, selectedSheet]);


  const handleReset = (e) => {
    setleft('');
    setright('');
    setInvalid(false);
    getDatas();
    setType(null);
    setPartlist(null);
    setSheet(null);
  };

  const handleReadSheet = (selectSheet) => {
    try {
      ExcelToJson(file, { sheet: selectSheet }).then((sheetContent) => {
        setleft(sheetContent);
        setSheet(selectSheet);
      });
      FormulasHelper.getFormulas(file, selectSheet, setFormulaList);
    } catch (error) {
      console.log('Read template failed.', error);
      store.dispatch(NotificationSystemActions.pushNotification({
        message: 'Read template failed.',
        level: 'error',
      }));
    }
  };

  const handleFileChange = (e) => {
    store.dispatch(LoadingActions.toggleLoadingStatus(true));
    try {
      setFile(e.target.files[0]);
      ExcelToJson(e.target.files[0], { getSheets: true }).then((sheets) => {
        setDropdownList(sheets.map(d => d.name));
      });
    } catch (error) {
      console.log('Upload template file to get dropdown failed.', error);
      store.dispatch(NotificationSystemActions.pushNotification({
        message: 'Upload template file to get dropdown failed.',
        level: 'error',
      }));
    } finally {
      store.dispatch(LoadingActions.toggleLoadingStatus(false));
    }
  };

  const handleClickConvert = (e) => {
    try {
      console.log('convert');
      const resource = Helper.stratificationArray(left, formulaList);
      const result = Helper.findDataKey(datas[selectedType][selectedPartlist], resource, isDraft);
      setright(JSON.stringify(result, null, '  '));
    } catch (error) {
      console.log('Convert template to JSON failed.', error);
      store.dispatch(NotificationSystemActions.pushNotification({
        message: 'Convert template to JSON failed.',
        level: 'error',
      }));
    }
  };

  const saveNewSetting = () => {
    try {
      const data = `module.exports = ${right.replace(/"/g, '\'').replace(/'\n/g, '\',\n')}`;
      const filename = `${selectedPartlist}`;
      FileHelper.saveJs(filename, data);
    } catch (error) {
      store.dispatch(NotificationSystemActions.pushNotification({
        message: 'Download setting code failed.',
        level: 'error',
      }));
    }
  };


  return (
    <Col>
      <Row>
        <Col sm={2}>Type: {selectedType}</Col>
        <Col sm={2}>Partlist: {selectedPartlist}</Col>
        <Col sm={2}>Sheet: {selectedSheet}</Col>
        <Col sm={6}>
          <Row>
            <Button disabled={invalid} color="info" onClick={handleClickConvert}>轉換</Button>
            <Button onClick={handleReset}>Reset</Button>
            <Button disabled={invalid} color="success" onClick={saveNewSetting}>檔案下載</Button>

            <Checkbox
              checked={isDraft}
              onChange={e => setIsDraft(e.target.checked)}
            >
              第一版草稿
            </Checkbox>
          </Row>
          <Row>
            {invalid && <Alert color="danger">{invalid}</Alert>}
          </Row>
        </Col>
      </Row>
      {datas &&
      <Row>
        <Col>
          <input type="file" id="input" onChange={handleFileChange} />
          <Row>
            <Col sm={2}>{/* 要讀取的sheet */}
              <Dropdown isOpen={ddlSheepOpen} toggle={() => setSheepOpen(prevState => !prevState)}>
                <DropdownToggle caret>
                  讀sheet
                </DropdownToggle>
                <DropdownMenu>
                  {dropdownList.map(item =>
                    <DropdownItem onClick={(e) => handleReadSheet(item)}>{item}</DropdownItem>)}
                </DropdownMenu>
              </Dropdown>
            </Col>

            <Col sm={2}>{/* PRODUCT TYPE */}
              <Dropdown isOpen={ddlTypeOpen} toggle={() => setTypeOpen(pre => !pre)}>
                <DropdownToggle caret>
                  PRODUCT TYPE
                </DropdownToggle>
                <DropdownMenu>
                  {Object.keys(PRODUCT_TYPE).map(item =>
                    <DropdownItem onClick={(e) => setType(PRODUCT_TYPE[item])}>{PRODUCT_TYPE[item]}</DropdownItem>)}
                </DropdownMenu>
              </Dropdown>
            </Col>

            <Col sm={2}>{/* Partlist */}
              <Dropdown isOpen={ddlPartlistOpen} toggle={() => setddlPartlistOpen(pre => !pre)}>
                <DropdownToggle caret>
                  Partlist
                </DropdownToggle>
                <DropdownMenu>
                  {Object.keys(datas.default).map(item =>
                    <DropdownItem onClick={(e) => setPartlist(item)}>{item}</DropdownItem>)}
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>}
      <Row>
        <Container>
          <Row>
            <Col>
              <Input
                type="textarea"
                value={left}
                rows={20}
                name="text"
                data-index="left"
                // onChange={handleChange}
              />
            </Col>
            <Col>
              <Input
                type="textarea"
                value={right}
                rows={20}
                name="text"
                data-index="right"
                // onChange={handleChange}
              />
            </Col>
          </Row>
        </Container>
      </Row>
    </Col>
  );
}


export default PartlistExportKey;
