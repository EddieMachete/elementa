'use strict';

import { Form, FormFieldValue } from '@core/domain';

export interface IAppStoreProvider {
  setCurrentForm(form: Form, values: { [id: string]: FormFieldValue }): Promise<void>;
  updatingFormValues(): Promise<void>;
  updateStatus(statusCode: number): Promise<void>;
  updateValues(updatedFormFieldValues: { [id: string]: FormFieldValue }): Promise<void>;
}
