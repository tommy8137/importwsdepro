import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import Icon, { IconName } from '~~elements/Icon';
import Folders from '~~features/Database/components/Folders';
import AvlList from './AvlList';
import CommonPool from './CommonPool';
import TemporaryFiles from './TemporaryFiles';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  padding: 0rem 1rem;
`;

const FOLDER_LIST = [
  'AVL List',
  'Common Pool',
  'Temporary Files',
];

function EE(props) {
  const [activeFolder, setActiveFolder] = useState(FOLDER_LIST[0]);

  const ListComponent = {
    'AVL List': AvlList,
    'Common Pool': CommonPool,
    'Temporary Files': TemporaryFiles,
  }[activeFolder];

  return (
    <Wrapper>
      <Folders
        folderList={FOLDER_LIST}
        onForderClick={setActiveFolder}
        activeFolder={activeFolder}
      />
      <ListComponent />
    </Wrapper>
  );
}


export default EE;
