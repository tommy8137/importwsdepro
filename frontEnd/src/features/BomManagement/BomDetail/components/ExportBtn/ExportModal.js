import React, { useState } from 'react';
import styled from 'styled-components';
import _head from 'lodash/head';
import _get from 'lodash/get';
import Modal from '~~elements/Modal';
import Button from '~~elements/Button';
import Field from '~~elements/Field';
import Select from '~~elements/Select';

const CURRENCY_OPTIONS = [{ label: 'USD', value: 'USD' }, { label: 'RMB', value: 'RMB' }];
const DEFAULT_CURRENCY_OPTION = _get(CURRENCY_OPTIONS, 0);
const SKU_OPTIONS = [...Array(6).keys()].map(i => ({ label: `SKU${i}`, value: `sku${i}` }));
const DEFAULT_CSKU_OPTION = _get(SKU_OPTIONS, 1);

function ExportModal(props) {
  const [selectedCurrency, setSelectedCurrency] = useState(DEFAULT_CURRENCY_OPTION);
  const [selectedSku, setSelectedSku] = useState(DEFAULT_CSKU_OPTION);
  const {
    isOpen = false,
    onClickExport = () => { },
    onCancelExport = () => { }
  } = props;

  function handleClickCancel() {
    onCancelExport();
  }

  function handleExport() {
    const { value: currency = '' } = selectedCurrency;
    const { value: sku = '' } = selectedSku;
    onClickExport(currency, sku);
  }

  const exportDisabled = !selectedCurrency || !selectedSku;

  return (
    <Modal.Modal isOpen={isOpen}>
      <Modal.ModalHeader>
        Choose SKU to Export
      </Modal.ModalHeader>
      <Modal.ModalBody>
        <Field.Row>
          <Field.Field width="50%">
            <Field.Label title="Currency" />
            <Select
              options={CURRENCY_OPTIONS}
              value={selectedCurrency}
              onChange={opt => setSelectedCurrency(opt)}
            />
          </Field.Field>
          <Field.Field width="50%">
            <Field.Label title="SKU" />
            <Select
              options={SKU_OPTIONS}
              value={selectedSku}
              onChange={opt => setSelectedSku(opt)}
            />
          </Field.Field>
        </Field.Row>
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button
          color="white"
          onClick={handleClickCancel}
        >
          Cancel
        </Button>
        <Button
          color="black"
          onClick={handleExport}
          disabled={exportDisabled}
        >Export
        </Button>
      </Modal.ModalFooter>
    </Modal.Modal>
  );
}


export default ExportModal;
