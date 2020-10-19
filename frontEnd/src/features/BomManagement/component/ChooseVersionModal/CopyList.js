import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '~~elements/Modal';
import Select from '~~elements/Select';
import Radio from '~~elements/Radio';
import Button from '~~elements/Button';
import _get from 'lodash/get';
import _uniqBy from 'lodash/uniqBy';
import _groupBy from 'lodash/groupBy';
import _find from 'lodash/find';
import { dispatchNotification, dispatchLoading } from '~~utils/CommonUtils';
import Resource from '~~apis/resource';

const CopyListContainer = styled.div`
  display: block;
  .list-title {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    padding: 4px 12px;
    .select {
      width: 15rem;
      max-width: 100%;
    }
  }
  .list-title-blue {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    background-color: #7c90a9;
    padding: 4px 12px;
    justify-content: space-between;
    p {
      color: white;
    }
    .select {
      width: 25rem;
      max-width: 100%;
    }
  }
  .list-title-col {
    flex: 0 auto;
    p {
      font-size: 1.125rem;
      font-weight: bolder;
      margin-bottom: 0;
      white-space: nowrap;
      margin-right: 1rem;
    }
  
  }
  .version-list {
    display: block;
    overflow-y: auto;
    max-height: 10rem;
    .list-item {
      background-color: #f0f0f0;
      .group-title {
        padding-left: 2.5rem;
        background-color: white;
        padding: 0.5rem 0rem 0.5rem 2rem;
        font-weight: bolder;
      }
      .group-list {
        background-color: #f0f0f0;
        .group-list-item {
          padding: 0.5rem;
        }
      }
    }
  }

`;


const EMPTY_OPTION = { label: '-', value: '' };

const COPYBY_VALUES = {
  THIS_PROJECT: 0,
  OTHER_PROJECT: 1,
};

const COPYBY_OPTIONS = [
  { label: 'This Project', value: COPYBY_VALUES.THIS_PROJECT },
  { label: 'Other Project', value: COPYBY_VALUES.OTHER_PROJECT }
];

const CopyList = props => {
  const [selectedBomId, setSelectedBomId] = useState('');
  const [projectOptions, setProjectOptions] = useState([]);
  const [copyBy, setCopyBy] = useState(COPYBY_OPTIONS[0].value);
  const [copyCostBomID, setCopyCostBomID] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [stageOptions, setStageOptions] = useState([]);
  const [copyList, setCopylist] = useState([]);

  const {
    onClickCancel = () => { },
    onClickCopy = () => { },
    onClickNextVersion = () => { },
    selectedBomId: propsSelectedBomId
  } = props;

  useEffect(() => {
    getProjectlList();
  }, []);

  useEffect(() => {
    if (propsSelectedBomId) {
      setSelectedBomId(propsSelectedBomId);
    }
  }, [propsSelectedBomId]);

  useEffect(() => {
    if (copyBy === COPYBY_VALUES.OTHER_PROJECT) {
      const firstProjectBomId = projectOptions?.[0]?.value;
      if (firstProjectBomId) {
        setSelectedBomId(firstProjectBomId);
      }
    } else if (copyBy === COPYBY_VALUES.THIS_PROJECT) {
      setSelectedBomId(propsSelectedBomId);
    }
  }, [copyBy]);

  useEffect(() => {
    if (selectedBomId) {
      // console.log('now bom id', selectedBomId);
      setCopyCostBomID('');
      getCopyList(selectedBomId);
    }
  }, [selectedBomId]);


  useEffect(() => {
    const newStageOptions = _uniqBy(copyList, 'stage').map(obj => {
      return { label: obj.stage, value: obj.stage };
    });
    const defaultStageOption = _get(newStageOptions, [0, 'value'], '');
    // 取得新的stage options跟設定一開始的預設值
    setSelectedStage(defaultStageOption);
    setStageOptions(newStageOptions);
  }, [JSON.stringify(copyList)]);

  useEffect(() => {
    setCopyCostBomID('');
  }, [selectedStage]);

  function handleChangeProject(opt) {
    setSelectedBomId(opt.value);
  }

  /**
   * 取得project list 下拉選單
   */
  async function getProjectlList() {
    dispatchLoading(true);
    try {
      const res = await Resource.BomDetailResource.getCopyProjectList();
      const projectList = res?.data?.projectList || [];
      if (projectList) {
        const newProjectOptions = projectList.map(obj => ({ label: obj.label, value: obj.bom_id }));
        setProjectOptions(newProjectOptions);
      }
    } catch (error) {
      dispatchNotification({ error });
    }
    dispatchLoading(false);
  }


  /**
   * 取得copy list 列表
   * @param {}} bomId 從Version list選擇的bomId, 或是project list所選擇的bomId
   */
  async function getCopyList(bomId) {
    dispatchLoading(true);
    try {
      const res = await Resource.BomDetailResource.getCopyList(bomId);
      const newCopyList = res?.data?.copyList || [];
      setCopylist(newCopyList);
    } catch (error) {
      dispatchNotification({ error });
    }
    dispatchLoading(false);
  }


  /**
   * 當stage下拉改變時
   * @param {*} opt option obj
   */
  function handleChangeStage(opt) {
    const newSelectedStage = opt?.value;
    if (newSelectedStage) {
      setSelectedStage(newSelectedStage);
    }
  }

  /**
   * 選擇要複製的copyCostId
   * @param {*} id bomId: 要copy的bomId
   */
  function handleSelectBomId(id) {
    setCopyCostBomID(id);
  }

  function handleClickCopy() {
    onClickCopy(copyCostBomID);
  }

  function handleClickNextVersion() {
    onClickNextVersion(propsSelectedBomId);
  }

  function handleChangeCopyBy(opt) {
    setCopyBy(opt.value);
  }

  const groupedCopyList = _groupBy(copyList, obj => obj.stage);
  const groups = Object.keys(groupedCopyList).filter(obj => obj === selectedStage);
  const stageValue = _find(stageOptions, obj => obj.value === selectedStage) || EMPTY_OPTION;
  const selectedProjectOption = projectOptions.find(obj => obj.value === selectedBomId) || EMPTY_OPTION;
  const selectedCopyBy = COPYBY_OPTIONS.find(obj => obj.value === copyBy) || EMPTY_OPTION;

  const showNextVersion = !copyCostBomID && copyBy === COPYBY_VALUES.THIS_PROJECT;

  return (
    <React.Fragment>
      <Modal.ModalBody>
        <CopyListContainer>
          <div className="list-title">
            <div className="list-title-col">
              <p>Copy By</p>
            </div>
            <div className="list-title-col">
              <Select
                className="select"
                target="box"
                options={COPYBY_OPTIONS}
                value={selectedCopyBy}
                onChange={handleChangeCopyBy}
              />
            </div>
          </div>
          {
            copyBy === COPYBY_VALUES.OTHER_PROJECT &&
            <div className="list-title-blue">
              <div className="list-title-col">
                <p>Project</p>
              </div>
              <div className="list-title-col">
                <Select
                  className="select"
                  target="box"
                  options={projectOptions}
                  value={selectedProjectOption}
                  onChange={handleChangeProject}
                />
              </div>

            </div>
          }
          <div className="list-title-blue">
            <div className="list-title-col">
              <p>Stage</p>
            </div>
            <div className="list-title-col">
              <Select
                className="select"
                target="box"
                options={stageOptions}
                value={stageValue}
                onChange={handleChangeStage}
              />
            </div>
          </div>
          <div className="version-list">
            {
              groups.map(groupKey => {
                const copyItemList = _get(groupedCopyList, [groupKey], []);
                return (
                  <div className="list-item">
                    <div className="group-title">
                      {groupKey}
                    </div>
                    <div className="group-list">
                      {
                        copyItemList.map(obj => {
                          const { bom_id: bomId = '' } = obj;
                          const isChecked = bomId && bomId === copyCostBomID;
                          return (
                            <div className="group-list-item">
                              <Radio
                                onChange={() => handleSelectBomId(bomId)}
                                checked={isChecked}
                              >
                                {obj.label}
                              </Radio>
                            </div>
                          );
                        })
                      }
                    </div>
                  </div>
                );
              })
            }
          </div>
        </CopyListContainer >
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={onClickCancel}>Cancel</Button>
        {
          showNextVersion ?
            <Button color="black" onClick={handleClickNextVersion}>Next Version</Button> :
            <Button color="black" onClick={handleClickCopy} disabled={!copyCostBomID}>Select</Button>
        }
      </Modal.ModalFooter>
    </React.Fragment>
  );
};
export default CopyList;
