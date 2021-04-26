'use strict';

import { IAppState, StatusCodes } from "@core/boundaries";
import { IDataStore } from "./";
import * as Reducers from './reducers';

export const appStore: IDataStore<IAppState> = {
  state: {
    currentForm: null,
    valuesLastUpdated: {},
    values: {},
    currentFormMarkup: '',
    status: StatusCodes.NotInitialized,
  },
  subscribe: function (handler) {
    if (!this.handlers) {
      this.handlers = [];
    }

    this.handlers.push(handler);

    return () => {
      // EE: The line below can remove the handler in just one line of code, however, it will iterate through the entire array.
      // The code after, however, will stop once it finds the handler to be removed from the subscriber's list.
      // this.handlers = this.handlers.filter((value: Function) => value != handler);

      const index: number = this.handlers.findIndex((value: Function) => value === handler);
      if (index > -1) { this.handlers.splice(index, 1); }
    };
  },
  getState: function () {
    return this.state;
  },
  dispatch: function (action) {
    Reducers.default.forEach((reducer: Function) => {
      this.state = reducer(this.state, action);
    });

    if (!this.handlers) {
      return;
    }

    this.handlers.forEach((handler: Function) => handler(this.state, action.type));
  }
};
