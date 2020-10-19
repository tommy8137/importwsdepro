import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import _sortBy from 'lodash/sortBy';
import Select from '~~elements/Select';

const SelectContainer = styled.div`
  width: 16rem;
  margin-left: 1rem;
`;


const mappingOptions = (data) => ({ ...data, label: data.name, value: data.key });

function ColumnFilter(props) {
  const { allColumns, columns, onClose, } = props;
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState();

  useEffect(() => {
    const newOptions = allColumns.map(mappingOptions);
    setOptions(newOptions);
  }, [JSON.stringify(allColumns)]);

  useEffect(() => {
    const newVal = columns.map(mappingOptions);
    setSelectedOptions(newVal);
  }, [JSON.stringify(columns)]);


  function handleClose() {
    const newVal = _sortBy(selectedOptions, 'colIdx');
    onClose(newVal);
  }

  function handleChange(opts) {
    setSelectedOptions(opts);
  }

  return (
    <SelectContainer>
      <Select
        target="box"
        isMulti
        options={options}
        value={selectedOptions}
        onClose={handleClose}
        onChange={handleChange}
      />
    </SelectContainer>
  );
}

export default ColumnFilter;
