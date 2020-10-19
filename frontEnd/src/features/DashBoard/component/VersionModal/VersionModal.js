import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '~~elements/Modal';
import _get from 'lodash/get';
import _groupBy from 'lodash/groupBy';
import _transform from 'lodash/transform';
import _find from 'lodash/find';

import Button from '~~elements/Button';

import EeVersionList from './EeVersionList';
import MeVersionList from './MeVersionList';
import EmdmVersionList from './EmdmVersionList';

const Tabs = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
`;

const Tab = styled.div`
  cursor: pointer;
  padding: 0 1rem;
  margin-right: 1rem;
  font-size: 1.2rem;
  line-height: 1.2;
  border-bottom: 3px solid ${({ active }) => (active ? '#6ca4d6' : '#aaa')};
  &:last-child {
    margin-right: 0rem;
  }
`;

const VersionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 -0.5rem;
  height: 100%;
  transform: translate(0px, 0px);
  /* overflow: hidden; */
  .version {
    width: 100%;
    flex: 0 50%;
    padding: 0.5rem;
    .version-top {
      padding: 1rem;
      font-weight: bolder;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`;

const VERSION_TABS_CONFIG = {
  ME: 'ME',
  EMDM: 'EMDM'
};

function VersionModal(props) {
  const [selectedTab, setSelectedTab] = useState(VERSION_TABS_CONFIG.ME);
  const [selectedMe, setSelectedMe] = useState(null);
  const [selectedEe, setSelectedEe] = useState(null);

  const {
    isOpen,
    versions: {
      meVersions = [],
      eeVersions = [],
      emdmVersions = [] }
  } = props;


  // 關閉modal時，清空所選擇的ee, me verison
  useEffect(() => {
    if (isOpen === false) {
      setSelectedMe('');
      setSelectedEe('');
      setSelectedTab(VERSION_TABS_CONFIG.ME);
    }
  }, [isOpen]);

  // 切換tab時，把目前所選的me version清空
  useEffect(() => {
    setSelectedMe('');
  }, [selectedTab]);


  function handleChangeMeRadio(newSelectedMe) {
    setSelectedMe(newSelectedMe);
  }

  function handleChangeEeRadio(newSelectedEe) {
    setSelectedEe(newSelectedEe);
  }

  function handleClickCancel(e) {
    props.onClickCancel();
  }

  function handleClickChoose(e) {
    const { versions: { projectInfo } } = props;
    props.onClickChoose({ selectedEe, selectedMe }, _get(projectInfo, 'project_code', ''));
  }

  // 只要選擇其中一個就可以合併
  const isDisabled = !selectedMe && !selectedEe;

  return (
    <Modal.Modal
      widthType="large"
      isOpen={isOpen}
    >
      <Modal.ModalHeader>
        Choose Version to Combine
      </Modal.ModalHeader>
      <Modal.ModalBody>
        {/* EE */}
        <VersionContainer>
          <div className="version">
            <div className="version-top">
              EE Version
            </div>
            <EeVersionList
              data={eeVersions}
              onChange={handleChangeEeRadio}
              selected={selectedEe}
            />
          </div>
          <div className="version">
            <div className="version-top">
              ME Version
              <Tabs>
                <Tab
                  onClick={() => setSelectedTab(VERSION_TABS_CONFIG.EMDM)}
                  active={selectedTab === VERSION_TABS_CONFIG.EMDM}
                >
                  eMDM
                </Tab>
                <Tab
                  onClick={() => setSelectedTab(VERSION_TABS_CONFIG.ME)}
                  active={selectedTab === VERSION_TABS_CONFIG.ME}
                >
                  ME
                </Tab>
              </Tabs>
            </div>
            {
              selectedTab === VERSION_TABS_CONFIG.ME ?
                <MeVersionList
                  data={meVersions}
                  onChange={handleChangeMeRadio}
                  selected={selectedMe}
                /> :
                <EmdmVersionList
                  data={emdmVersions}
                  onChange={handleChangeMeRadio}
                  selected={selectedMe}
                />
            }
          </div>
          {/* ME */}
        </VersionContainer>
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={handleClickCancel}>Cancel</Button>
        <Button color="black" onClick={handleClickChoose} disabled={isDisabled}>Choose</Button>
      </Modal.ModalFooter>
    </Modal.Modal>
  );
}
export default VersionModal;
