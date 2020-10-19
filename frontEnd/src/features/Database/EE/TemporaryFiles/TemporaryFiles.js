import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import FileSaver from 'file-saver';
import { store } from '~~store';
import Table from '~~elements/Table';
import Alert from '~~elements/Alert';
import Button from '~~elements/Button';
import Icon from '~~elements/Icon';
import useResource from '~~hooks/useResource';
import TemporaryFilesResource from '~~apis/resource/DatabaseResources/TemporaryFilesResource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';

const ListWrapper = styled.div`
  padding: 0rem 1.9rem;
  margin-top: -2rem;
  .import {
    width: 100%;
    text-align: right;
  }
`;

function TemporaryFiles(props) {
  /* APIs */
  const uploadTemporaryFiles = useResource(
    TemporaryFilesResource.upload,
    '',
    { message: '上傳成功', level: 'success' },
    { message: 'The file name already exists. Use another name.', level: 'error' }
  );


  const getList = useResource(
    TemporaryFilesResource.getList,
    '',
    null,
    { message: '取得列表失敗，請稍後再試', level: 'error' }
  );
  const [isAlert, setIsAlert] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  /* Hooks */
  const inputRef = useRef(null);
  useEffect(() => {
    getList.exec();
  }, []);

  /* handler */
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    if (file !== undefined) {
      await uploadTemporaryFiles.exec(formData);
      await getList.exec();
    }
  };

  const handleUpload = (e) => {
    inputRef.current.click();
  };

  const handleDeleteAlert = (id) => {
    setDeleteId(id);
    setIsAlert(true);
  };

  const handleDownload = async (e, id) => {
    store.dispatch(LoadingActions.toggleLoadingStatus(true));
    try {
      const response = await TemporaryFilesResource.download(id);

      // 檔名的取得 要靠後端
      const { 'content-type': type, 'content-disposition': disposition } = response.headers;
      const regexResult = /attachment; filename="(.*)"$/g.exec(disposition);
      const filename = !!regexResult && regexResult.length > 0 ? decodeURIComponent(regexResult[1]) : 'Eprocurement_EE_AVL.xlsx';
      FileSaver.saveAs(
        new Blob([response.data], { type }),
        filename
      );
    } catch (err) {
      store.dispatch(NotificationSystemActions.pushNotification({
        message: '下載檔案失敗，請稍後再試',
        level: 'error'
      }));
    }
    store.dispatch(LoadingActions.toggleLoadingStatus(false));
  };

  const handleDelete = async (e, id) => {
    store.dispatch(LoadingActions.toggleLoadingStatus(true));
    try {
      await TemporaryFilesResource.delete(id);
      await getList.exec();
    } catch (err) {
      store.dispatch(NotificationSystemActions.pushNotification({
        message: '下載檔案失敗，請稍後再試',
        level: 'error'
      }));
    }
    store.dispatch(LoadingActions.toggleLoadingStatus(false));
  };

  // const uploadTemporaryFiles = async (data) => {
  //   let response;
  //   store.dispatch(LoadingActions.toggleLoadingStatus(true));
  //   try {
  //     response = await TemporaryFilesResource.upload(data);
  //     store.dispatch(LoadingActions.toggleLoadingStatus(false));
  //     store.dispatch(NotificationSystemActions.pushNotification({
  //       message: '上傳成功',
  //       level: 'success'
  //     }));
  //   } catch (err) {
  //     store.dispatch(LoadingActions.toggleLoadingStatus(false));
  //     store.dispatch(NotificationSystemActions.pushNotification({
  //       message: 'The file name already exists. Use another name.',
  //       level: 'error'
  //     }));
  //   }
  //   return response;
  // };

  /* setting */
  const headerBase = [
    { dataIndex: 'file_name', title: 'Item', width: '45%' },
    { dataIndex: 'update_by', title: 'Update By', width: '25%' },
    { dataIndex: 'update_time', title: 'Update Date', width: '15%' },
    { dataIndex: '',
      title: '',
      width: '15%',
      render: (val, record, index) => (
        <div>
          <Icon
            size="3rem"
            icon="BtnDownload"
            onClick={(e) => handleDownload(e, record.temporary_id)}
          />
          <Icon
            size="3rem"
            icon="BtnDelPCB"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteAlert(record.temporary_id);
            }}
          />
        </div>
      ) },
  ];

  const { temporary_list: data } = getList.response;
  return (
    <ListWrapper>
      <div className="import" >
        <Button
          round
          color="transparent"
          onClick={handleUpload}
        >
          <Icon icon="IcoImport" className="round-btn--icon" />
          Import
        </Button>
      </div>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleFileChange}
      />
      <Table
        rowKey="temporary_id"
        columns={headerBase}
        headerColor="blue"
        dataSource={data}
        // onChange={handleTableChange}
        pagination={false}
      />
      <Alert isOpen={isAlert} type="alarm">
        <div className="row">請確認是否要刪除？</div>
        <div className="row">
          <Button
            color="transparentInModal"
            border={false}
            onClick={(e) => {
              setIsAlert(false);
              handleDelete(e, deleteId);
            }}
          >
            確定
          </Button>
          <Button
            color="black"
            onClick={(e) => {
              e.stopPropagation();
              setIsAlert(false);
            }}
          >
            取消
          </Button>
        </div>
      </Alert>
    </ListWrapper>
  );
}


export default TemporaryFiles;
