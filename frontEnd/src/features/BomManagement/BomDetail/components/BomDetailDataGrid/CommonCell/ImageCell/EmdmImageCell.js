import React, { useState } from 'react';

import { pushNotification } from '~~hoc/NotificationSystem/NotificationSystemActions';
import { dispatchLoading } from '~~utils/CommonUtils';
import Resource from '~~apis/resource';
import Icon, { IconName } from '~~elements/Icon';
import PreviewImage from '~~elements/PreviewImage';

/*
Usage:
<BaseCell
  value={rows[rowIndex][Columns[columnIndex]['key']]}
  cellInfo={{ columnIndex, key, rowIndex, style: extendStyle }}
/>

*/
function ImageCell(props) {
  const [preview, setPreview] = useState({ isOpen: false, url: '', fileName: '' });
  const {
    cellInfo: { key, row, style, bomID, rowIndex },
    value,
  } = props;


  const handleClick = async (e) => {
    e.stopPropagation();
    dispatchLoading(true);
    try {
      let { data } = await Resource.BomManagementResource.getEmdmBomImage(bomID, row['source_item_id']);
      setPreview({
        isOpen: true,
        url: data[0].url,
        fileName: data[0].fileName,
      });
    } catch (err) {
      setPreview({
        isOpen: false,
        url: '',
        fileName: '',
      });
      pushNotification({ message: '取得圖片失敗，請稍候再試', level: 'error' });
    }
    dispatchLoading(false);
  };
  const handleClosePreview = (e) => {
    setPreview({
      isOpen: false,
      url: '',
      fileName: '',
    });
  };

  const handleDownload = (e) => {
    fetch(preview.url, {
      method: 'GET'
    })
      .then(response => {
        response.arrayBuffer().then((buffer) => {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', preview.fileName); // or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (!value) {
    return <div className="grid-cell" key={`${key}_${rowIndex}`} style={style} />;
  }
  return (
    <div className="grid-cell" key={`${key}_${rowIndex}`} style={style}>
      <Icon icon={IconName.BtnImage} onClick={handleClick} size="1.4rem" />
      <PreviewImage
        isSingle={true}
        fileName={preview.fileName}
        onDownload={handleDownload}
        image={preview.url}
        isOpen={preview.isOpen}
        toggleClose={handleClosePreview}
      />
    </div>
  );
}

export default ImageCell;
