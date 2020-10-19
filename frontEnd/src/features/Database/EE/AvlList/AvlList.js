import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import FileSaver from 'file-saver';
import { store, history } from '~~store';
import Table from '~~elements/Table';
import Icon from '~~elements/Icon';
import useResource from '~~hooks/useResource';
import AvlListResource from '~~apis/resource/DatabaseResources/AvlListResource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';


const ListWrapper = styled.div`
  padding: 0rem 1.9rem;
`;

function AvlList(props) {
  /* APIs */
  const uploadAvl = useResource(
    AvlListResource.upload,
    '',
    { message: '上傳成功', level: 'success' },
    { message: '上傳失敗，請稍後再試', level: 'error' }
  );
  const getList = useResource(
    AvlListResource.getList,
    '',
    null,
    { message: '取得列表失敗，請稍後再試', level: 'error' }
  );

  /* Hooks */
  const inputRef = useRef(null);
  useEffect(() => {
    getList.exec();
  }, []);

  /* handler */
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
    await uploadAvl.exec(data);
    await getList.exec();
  };

  const handleUpload = (e) => {
    inputRef.current.click();
  };

  const handleDownload = async (e, id) => {
    store.dispatch(LoadingActions.toggleLoadingStatus(true));
    try {
      const response = await AvlListResource.download(id);

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

  /* setting */
  const headerBase = [
    { dataIndex: 'file_name', title: 'Item', width: '35%' },
    { dataIndex: 'update_by', title: 'Update By', width: '25%' },
    { dataIndex: 'update_time', title: 'Update Date', width: '15%' },
    { dataIndex: 'version', title: 'Version', width: '10%' },
    { dataIndex: '',
      title: '',
      width: '15%',
      render: (val, record, index) => (
        <div>
          <Icon
            icon="BtnUpdate"
            size="3rem"
            onClick={handleUpload}
          />
          <input
            type="file"
            accept=".xlsx"
            style={{ display: 'none' }}
            ref={inputRef}
            onChange={handleFileChange}
          />
          <Icon
            size="3rem"
            icon="BtnDownload"
            onClick={(e) => handleDownload(e, record.avl_id)}
          />
        </div>
      ) },
  ];

  const { avl_list: data } = getList.response;
  return (
    <ListWrapper>
      <Table
        rowKey="avl_id"
        columns={headerBase}
        headerColor="blue"
        dataSource={data}
        // onChange={handleTableChange}
        pagination={false}
      />
    </ListWrapper>
  );
}


export default AvlList;
