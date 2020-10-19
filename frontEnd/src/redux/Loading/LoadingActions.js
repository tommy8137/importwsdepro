export const actionTypes = {
  LOADING___TOGGLE_LOADING_STATUS: 'LOADING___TOGGLE_LOADING_STATUS',
};


export function toggleLoadingStatus(isOnLoading) {
  return {
    type: actionTypes.LOADING___TOGGLE_LOADING_STATUS,
    isOnLoading,
  };
}

