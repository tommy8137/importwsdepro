import React, { Component } from 'react';
import styled from 'styled-components';
import Table from './Table';
import CalculatorUtils from './CalculatorUtils';


const CalculatorPreview = ({ tabData, configData }) => {
  if (!configData) {
    return null;
  }
  return (
    <div>
      <h3>{tabData ? tabData.label : null}</h3>
      <div>
        <h3>定值</h3>
        {configData.fields
          .filter(i => i.defaultValue)
          .map(field => {
            return (
              <div key={field.key}>
                <span style={{ minWidth: '200px', color: 'green', fontWeight: 'bold' }}>{field.label}: </span>
                <span style={{ minWidth: '550px' }}>{field.defaultValue}</span>
              </div>
            );
          })
        }
      </div>
      <div>
        <h3>Fomula</h3>
        {Object.keys(configData.formulaObjByKey).map(formulaKey => {
          const { fields, store } = configData;
          const formulaConfig = configData.formulaObjByKey[formulaKey];
          const { calcMethodName } = formulaConfig;
          const template = CalculatorUtils.getfomularTemplate(calcMethodName, formulaConfig, { fields, store }, {});
          return (
            <div key={configData.formulaObjByKey[formulaKey].key}>
              <span style={{ minWidth: '200px', color: 'green', fontWeight: 'bold' }}>{configData.formulaObjByKey[formulaKey].label}: </span>
              <span style={{ minWidth: '550px' }}>
                {template}
              </span>
            </div>
          );
        })
        }
      </div>
      <div>
        <h3>Store</h3>
        {Object.keys(configData.store).map(item => {
          const { header, data } = configData.store[item];
          let headers = header.map(i => {
            return {
              dataIndex: i.key,
              key: i.key,
              title: i.name,
              sortable: false,
            };
          });
          return (
            <Table headers={headers} rows={data} tableName={item} key={item} />
          );
        })}
      </div>
    </div>
  );
};


export default CalculatorPreview;
