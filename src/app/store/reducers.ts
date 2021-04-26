'use strict';

import { IAppState } from '@core/boundaries';
import { Form } from '@core/domain';
import { Actions } from './actions';
import { IActionWithPayload } from './iActionWithPayload';

const currentForm = (state: IAppState = null, action: IActionWithPayload<Form>): IAppState => {
  if (action.type !== Actions.SET_CURRENT_EXAM) {
      return state;
  }

  return Object.assign(
    {},
    state,
    { currentExam: action.payload }
  );
};

const status = (state: IAppState = null, action: IActionWithPayload<number>): IAppState => {
  switch(action.type) {
    case Actions.UPDATE_STATUS:
      return Object.assign(
        {},
        state,
        { status: action.payload }
      );
    default:
      return state;
  }
};

export {
  currentForm,
  status,
};

export default [
  currentForm,
  status,
];
