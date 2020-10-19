import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Icon from '~~elements/Icon';
import { Text, Select } from '~~features/BomManagement/component/Modal/Fields';
import { Step3Div } from './ImportFileStyles';


function Step3(props) {
  const { nameMatchingRef, uploadItemOwner, designeeOptions, confirmBomItem } = props;
  const initial = uploadItemOwner.reduce((prev, curr) => {
    return {
      ...prev,
      [curr.key]: null
    };
  }, {});
  const valid = uploadItemOwner.reduce((prev, curr) => {
    return {
      ...prev,
      [curr.key]: Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      }).required('此為必填欄位').nullable(),
    };
  }, {});
  return (
    <div>
      <Formik
        ref={nameMatchingRef}
        initialValues={initial}
        validationSchema={Yup.object().shape(valid)}
        onSubmit={(values, action) => {
          // console.log('>>>>values', values);
          const transferOwner = Object.keys(values).reduce((prev, curr) => {
            return [
              ...prev,
              {
                source: curr,
                destion: values[curr].value
              }
            ];
          }, []);
          confirmBomItem(transferOwner);
        }}
      >
        {({
          values,
          errors,
          touched,
          // handleChange and handleBlur work exactly as expected--they use a name or id attribute to figure out which field to update.
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          isSubmitting,
          /* and other goodies */
          setFieldValue,
          submitForm,
        }) => {
          return (
            <Step3Div>
              <div className="instru">
                * 左側為您檔案中Owner欄位的姓名，您需將該Owner姓名與您在Create BOM時所指派的人做配對。
              </div>
              <Form>
                {uploadItemOwner.map((item, index) => {
                  return (
                    <div className="group" key={index}>
                      <div className="field">
                        <Field
                          name={index + 1}
                          label={`Name From File #${index + 1}`}
                          component={Text}
                          readOnly={true}
                          value={item.value}
                        />
                      </div>
                      <Icon icon="IcoArrowRight" className="arrow" />
                      <div className="field">
                        <Field
                          name={item.key}
                          label={`Name From Assignment #${index + 1}`}
                          component={Select}
                          loadOptions={(inputvalue, callback) => callback(designeeOptions)}
                          onChange={handleChange}
                          isRequired={true}
                        />
                      </div>
                    </div>
                  );
                })}
              </Form>
            </Step3Div>
          );
        }}
      </Formik>
    </div>
  );
}

export default Step3;

