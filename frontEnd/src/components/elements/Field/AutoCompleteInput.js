import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Field from '~~elements/Field';
import useOutsideClick from '~~hooks/useOutsideClick';

const AutoCompleteContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

`;

const AutoCompleteMenu = styled.div`
  opacity: ${({ isOpen }) => { return isOpen ? '1' : '0'; }};
  visibility: ${({ isOpen }) => { return isOpen ? 'visible' : 'hidden'; }};
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 9;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #555;
  margin-top: 4px;
  overflow: hidden;
  overflow-y: auto;
  max-height: 12rem;
  .auto-complete-option {
    background-color: #FFFFFF;
    color: #333333;
    display: block;
    padding: 8px 12px;
    width: 100%;
    box-sizing: border-box;
    word-break: break-all;
    cursor: pointer;
    &:hover {
      background-color: #00A99D;
      color: #FFFFFF;
    }
  }
`;


function compareString(a, b) {
  try {
    return a.toString().includes(b.toString());
  } catch (e) {
    return false;
  }
}

function AutoCompleteInput(props) {
  const elRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const {
    value,
    options = [],
    onChange = () => { },
    // ...restProps
  } = props;


  useOutsideClick(elRef, () => {
    setIsOpen(false);
  });

  function handleSelectChange(opt) {
    setIsOpen(false);
    onChange(opt.value);
  }


  const opts = value ? options.filter(obj => compareString(obj.value, value)) : options;

  return (
    <AutoCompleteContainer innerRef={elRef}>
      <Field.ConvertInput
        {...props}
        dataType="string"
        onChange={onChange}
        onFocus={() => setIsOpen(true)}
      // onBlur={() => setIsOpen(false)}
      />
      {opts.length ?
        <AutoCompleteMenu isOpen={isOpen}>
          {
            opts.map(opt => {
              return (
                <div
                  className="auto-complete-option"
                  onClick={() => handleSelectChange(opt)}
                  onKeyDown={() => handleSelectChange(opt)}
                >
                  {opt.label}
                </div>
              );
            })
          }
        </AutoCompleteMenu>
        : null
      }
    </AutoCompleteContainer>
  );
}


export default AutoCompleteInput;
