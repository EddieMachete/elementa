'use strict';

import { IAppState } from '@core/boundaries';
import { Form, FormFieldValue } from '@core/domain';
import { Actions } from './actions';
import { IActionWithPayload } from './iActionWithPayload';

const currentForm = (state: IAppState = null, action: IActionWithPayload<{ form: Form, values: { [id: string]: FormFieldValue }}>): IAppState => {
  if (action.type !== Actions.SET_CURRENT_FORM) {
      return state;
  }

  return Object.assign(
    {},
    state,
    {
      currentForm: action.payload.form,
      values: action.payload.values,
    }
  );
};

const formFieldValues = (state: IAppState = null, action: IActionWithPayload<{ [id: string]: FormFieldValue }[]>): IAppState => {
  switch(action.type) {
    case Actions.UPDATE_FORM_FIELD_VALUES:
      return Object.assign(
        {},
        state,
        { values: Object.assign({}, state.values, action.payload) },
      );
    default:
      return state;
  }
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
  formFieldValues,
  status,
};

export default [
  currentForm,
  formFieldValues,
  status,
];
