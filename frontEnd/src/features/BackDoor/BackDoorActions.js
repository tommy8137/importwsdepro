export const actionTypes = {
  BACK_DOOR___LOGIN: 'BACK_DOOR___LOGIN',
  BACK_DOOR___LOGIN_SUCCESS: 'BACK_DOOR___LOGIN_SUCCESS',
  BACK_DOOR___LOGIN_FAILED: 'BACK_DOOR___LOGIN_FAILED',
};

export function loginBackDoor(emplid) {
  return {
    type: actionTypes.BACK_DOOR___LOGIN,
    emplid
  };
}

export function loginBackDoorSuccess(response) {
  // console.log('Action login back door success', response);
  return {
    type: actionTypes.BACK_DOOR___LOGIN_SUCCESS,
  };
}


export function loginBackDoorFailed(response) {
  console.log('Action login back door failed >>>', response);
  return {
    type: actionTypes.BACK_DOOR___LOGIN_FAILED,
  };
}

