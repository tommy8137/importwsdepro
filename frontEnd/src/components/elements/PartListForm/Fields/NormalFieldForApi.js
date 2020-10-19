import React, {
  useState,
  useEffect,
} from 'react';
import _get from 'lodash/get';
import Field from '~~elements/Field';
import PartlistResource from '~~apis/resource/PartlistResource';
import CommonUtils from '~~utils/CommonUtils';
import LabelField from './LabelField';


// 後端即時運算
function NormalFieldForApi(props) {
  const [prevReq, setPrevReq] = useState(undefined);
  const { isShown, fieldConfig, value, dependsValuesData, onChange = () => { } } = props;
  const { label, readOnly, url = '', key } = fieldConfig;
  const { urlValues = {} } = dependsValuesData;
  const params = CommonUtils.resolveParams(url, { ...urlValues, key });
  const mappedUrl = CommonUtils.resolvePath(url, params);

  // 在normal fiel有selectorConfig這個key就代表要用來處理需要比對的情形
  useEffect(() => {
    fetch();
  }, [mappedUrl]);


  async function fetch() {
    if (!mappedUrl || params.filter(p => p !== null && p !== undefined && p !== '').length !== params.length) {
      return;
    }
    try {
      if (prevReq) {
        prevReq.cancel();
      }

      const req = PartlistResource.getInputValueCancel(mappedUrl);
      setPrevReq(req);
      const response = await req.send();
      const newValue = _get(response, ['data', 'values', key], '');
      onChange(newValue);
    } catch (error) {
      console.error(`[${label}] get value failed >>>>`, error.response);
    }
  }

  return (
    isShown ? (
      <React.Fragment>
        <LabelField fieldConfig={fieldConfig} />
        <Field.Input
          disabled
          type="text"
          name={props.name}
          readOnly={readOnly}
          value={(value !== null && value !== undefined) ? value : ''}
          className={`e2e-input---${key}`}
        />
      </React.Fragment>
    ) : null
  );
}


export default NormalFieldForApi;
