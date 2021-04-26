'use strict';

import { IAppStoreProvider, IFormProvider, StatusCodes } from "@core/boundaries";
import { Form } from "@core/domain";

export async function loadFormUseCase(appStoreProvider: IAppStoreProvider, formProvider: IFormProvider, id: number): Promise<void> {
  await appStoreProvider.updateStatus(StatusCodes.LoadingForm);
  const form: Form = await formProvider.getForm(id);
  await appStoreProvider.setCurrentForm(form);
  //appStoreProvider.updateStatus(StatusCodes.Ready);

  return Promise.resolve();
}