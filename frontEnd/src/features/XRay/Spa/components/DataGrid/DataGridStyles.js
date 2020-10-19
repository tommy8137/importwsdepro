import styled from 'styled-components';

export const DataGridWrapper = styled.div`
  .grid-bottom-right {
    /* overflow-y: hidden !important; */
    ::-webkit-scrollbar:vertical {
      display:none;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb:vertical {
      display:none;
    }
  }
`;


// column fixed的時候，要有一條右邊的border
export const borderRightStyle = {
  borderRight: '2px solid #d7d7d7',
  justifyContent: 'center'
};

// 每個row要加底線
export const borderBottomStyle = {
  borderBottom: '1px solid #d7d7d7',
};


function baseGridCellStyle(columnConfig) {
  return {
    fontSize: '0.875rem',
    paddingLeft: `${columnConfig.paddingLeft}px`,
    paddingRight: `${columnConfig.paddingRight}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: columnConfig.justifyContent
  };
}


/*
header的基本style
*/
export const getHeaderStyle = (currentStyle, columnConfig) => {
  return {
    ...currentStyle,
    backgroundColor: '#7c90a9',
    color: '#f0f0f0',
    ...baseGridCellStyle(columnConfig)
  };
};


/*
table content的基本style
*/
export const getGridBodyStyle = (currentStyle, columnConfig) => {
  return {
    ...currentStyle,
    borderBottom: '1px solid #d7d7d7',
    ...baseGridCellStyle(columnConfig)
  };
};

/*
取得一個row的高度
index: row index
*/
export const getRowHeight = ({ index }) => {
  const DEFAULT_ROW_HEADER_HEIGHT = 44;
  const DEFAULT_ROW_BODY_HEIGHT = 50;
  if (index === 0) {
    return DEFAULT_ROW_HEADER_HEIGHT;
  }
  return DEFAULT_ROW_BODY_HEIGHT;
};

/*
取得每個column要多寬
index: column index
Columns: 欄位的config
*/
export const getColumnWidth = (index, Columns, tableWidth = 0) => {
  const DEFAULT_COLUMN_WIDTH = 100;
  const DEFAULT_COLUMN_PADDING_LEFT = 13;
  const DEFAULT_COLUMN_PADDING_RIGHT = 13;
  let width = (Columns[index].width || DEFAULT_COLUMN_WIDTH);
  let paddingLeft = Columns[index].paddingLeft || DEFAULT_COLUMN_PADDING_LEFT;
  let paddingRight = Columns[index].paddingRight || DEFAULT_COLUMN_PADDING_RIGHT;

  return width + paddingLeft + paddingRight;
};


export const SELECTED_BACKGROUND_COLOR = '#f0f0f0';
export const CHECKED_BACKGROUND_COLOR = '#d7dde5';


export default DataGridWrapper;

