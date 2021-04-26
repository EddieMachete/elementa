'use strict';

import { FormFieldValue } from '@core/domain';

export interface IAppStoreProvider {
  updatingFormValues(): Promise<void>;
  updateStatus(statusCode: number): Promise<void>;
  updateValues(updatedFormFieldValues: { [id: string]: FormFieldValue }): Promise<void>;
}
