/* eslint-disable camelcase */

import traverse from 'traverse';
import _hasIn from 'lodash/hasIn';
import _get from 'lodash/get';
import _fpSet from 'lodash/fp/set';
import _last from 'lodash/last';
import _isEqual from 'lodash/isEqual';
import _isString from 'lodash/isString';
import _findIndex from 'lodash/findIndex';

export const checkIncludes = (a = '', b = '') => {
  if (_isString(a) && _isString(b)) {
    return a.toLocaleUpperCase().includes(b.toLocaleUpperCase());
  }
  return false;
};

export function handleSelectPlant(selected = [], plants = [], purchasing_organization = '', value = true) {
  const newSelected = plants.reduce((prev, curr) => {
    const findIndex = _findIndex(prev, obj =>
      obj.purchasing_organization === purchasing_organization &&
      obj.plant === curr.plant);

    if (findIndex > -1 && value === false) {
      const newPrev = prev.filter((o, i) => i !== findIndex);
      return newPrev;
    }
    if (findIndex <= -1 && value === true) {
      return prev.concat({ purchasing_organization, plant: curr.plant });
    }
    return prev;
  }, selected);
  return newSelected;
}

export function checkedStatus(selected = [], plants = [], purchasing_organization = '') {
  const status = plants.reduce((prev, curr) => {
    const findObj = selected.find(obj =>
      obj.plant === curr.plant && purchasing_organization === obj.purchasing_organization);

    return {
      checked: findObj ? prev.checked + 1 : prev.checked,
      total: prev.total + 1
    };
  }, { total: 0, checked: 0 });

  const { total, checked } = status;

  return {
    total,
    checked: checked > 0,
    indeterminate: checked > 0 && checked < total
  };
}

export function checkedAllStatus(selected = [], data = []) {
  const allPlants = data.reduce((prev, curr) => {
    const { purchasing_organization: purchasingOrg, plants = [] } = curr;
    const selectObjs = plants.map(p => ({ purchasing_organization: purchasingOrg, plant: p.plant }));
    return [...prev, ...selectObjs];
  }, []);

  const status = allPlants.reduce((prev, curr) => {
    const findObj = selected.find(obj =>
      obj.plant === curr.plant && obj.purchasing_organization === curr.purchasing_organization);

    return {
      checked: findObj ? prev.checked + 1 : prev.checked,
      total: prev.total + 1
    };
  }, { total: 0, checked: 0 });

  const { total, checked } = status;

  return {
    total,
    checked: checked > 0,
    indeterminate: checked > 0 && checked < total
  };
}
