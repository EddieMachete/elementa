'use strict';

import { Actions, IDataStore } from "@app/store";
import { IAppState, IAppStoreProvider } from "@core/boundaries";
import { Form, FormFieldValue } from "@core/domain";

export class AppStoreProvider implements IAppStoreProvider {
  public constructor(private appStore: IDataStore<IAppState>) {
  }
  
  public setCurrentForm(form: Form, values: { [id: string]: FormFieldValue }): Promise<void> {
    this.appStore.dispatch(
      {
        type: Actions.SET_CURRENT_FORM,
        payload: { form, values },
      }
    );

    return Promise.resolve();
  }

  public updatingFormValues(): Promise<void> {
    return Promise.resolve();
  }
  
  public updateStatus(statusCode: number): Promise<void> {
    this.appStore.dispatch(
      {
        type: Actions.UPDATE_STATUS,
        payload: statusCode,
      }
    );

    return Promise.resolve();
  }

  public updateValues(updatedFormFieldValues: { [id: string]: FormFieldValue }): Promise<void> {
    console.log(updatedFormFieldValues);

    this.appStore.dispatch(
      {
        type: Actions.UPDATE_FORM_FIELD_VALUES,
        payload: updatedFormFieldValues,
      }
    );

    return Promise.resolve();
  }
}