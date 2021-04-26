'use strict';

import { IAppStoreProvider, StatusCodes } from "@core/boundaries";

export async function initializeAppUseCase(appStoreProvider: IAppStoreProvider) {
  await appStoreProvider.updateStatus(StatusCodes.Initializing);
  appStoreProvider.updateStatus(StatusCodes.Ready);
}
