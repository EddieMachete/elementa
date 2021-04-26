'use strict';

import { IAppStoreProvider, IFormProvider, StatusCodes } from "@core/boundaries";
import { Form, FormFieldValue } from "@core/domain";

export async function loadFormUseCase(appStoreProvider: IAppStoreProvider, formProvider: IFormProvider, id: number): Promise<void> {
  await appStoreProvider.updateStatus(StatusCodes.LoadingForm);
  const result: {form: Form; values: { [id: string]: FormFieldValue }} = await formProvider.getForm(id);
  await appStoreProvider.setCurrentForm(result.form, result.values);
  //appStoreProvider.updateStatus(StatusCodes.Ready);

  return Promise.resolve();
}