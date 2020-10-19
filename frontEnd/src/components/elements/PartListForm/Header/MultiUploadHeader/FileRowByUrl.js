import React, { useState, useEffect, Fragment } from 'react';
import Icon, { IconName } from '~~elements/Icon';
import PreviewImage from '~~elements/PreviewImage';
import FileRowBox from './FileRowStyles';

function FileRowByUrl(props) {
  const { images, image: { fileName, }, index } = props;
  const [showPreview, setShowPreiew] = useState(false);
  const [activeIndex, setActiveIndex] = useState(index);
  useEffect(() => {
    if (!showPreview) {
      setActiveIndex(index);
    }
  }, [showPreview]);

  const handleDownload = () => {
    const img = images[activeIndex];
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
  return (
    <Fragment>
      <FileRowBox className="file-box">
        <div className="file-box-text" title={fileName}>{fileName}</div>

        {/* 按鈕們 */}
        <div className="file-box-function">
          {fileName &&
          <Icon
            icon={IconName.BtnImage}
            className="btn-image"
            onClick={() => setShowPreiew(true)}
          />}
        </div>
      </FileRowBox>
      <PreviewImage
        isOpen={showPreview}
        isSingle={images.length === 1}
        imgIdList={images.map(d => d.url)}
        activeIndex={activeIndex}
        image={images[activeIndex].url}
        handlePreviewImg={setActiveIndex}
        toggleClose={() => setShowPreiew(false)}
        onDownload={handleDownload}
      />
    </Fragment>
  );
}

export default FileRowByUrl;
