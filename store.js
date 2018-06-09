import { createStore } from 'redux';

const initialState = {
  org: 'Public',
}

export const actionTypes = {
  ORG_SELECT: 'ORG_SELECT',
}

// REDUCERS
export const reducer = (state = initialState, action) => {
  console.log('dispatch caught');
  console.log(action);
  console.log(state);
  switch (action.type) {
    case actionTypes.ORG_SELECT:
      return Object.assign({}, state, {
        org: action.org
      })
    default: return state
  }
}

// ACTIONS
export const chooseOrg = (org) => {
  console.log('dispatched called');
  return {type: actionTypes.ORG_SELECT, org: org};
}

export function initializeStore (initialState = initialState) {
  return createStore(reducer, initialState);
}
