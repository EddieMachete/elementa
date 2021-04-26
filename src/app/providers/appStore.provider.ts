'use strict';

import { Actions, IDataStore } from "@app/store";
import { IAppState, IAppStoreProvider } from "@core/boundaries";
import { FormFieldValue } from "@core/domain";

export class AppStoreProvider implements IAppStoreProvider {
  public constructor(private appStore: IDataStore<IAppState>) {
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
    return Promise.resolve();
  }
}