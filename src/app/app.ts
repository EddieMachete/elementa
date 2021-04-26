import { IAppState, StatusCodes } from "@core/boundaries";
import { initializeAppUseCase } from "@core/usecases";
import {
  AppStoreProvider,
  FormProvider,
  XMLHTTP,
} from "./providers";
import { appStore } from "./store";

export class App {
  private appStoreProvider: AppStoreProvider;
  private formProvider: FormProvider;
  private unsubscribeFromStoreHandler: Function;

  public constructor(dataEndpoint: string) {
    const http:XMLHTTP = new XMLHTTP();
    this.appStoreProvider = new AppStoreProvider(appStore);
    this.formProvider = new FormProvider(http, dataEndpoint);

    this.unsubscribeFromStoreHandler = appStore.subscribe((state: IAppState, actionType: string) => this.stateChanged(state, actionType))

    initializeAppUseCase(this.appStoreProvider);
  }

  public disconnect(): void {
    this.unsubscribeFromStoreHandler();
  }

  private stateChanged(state: IAppState, actionType: string): void {
    if (state.status === StatusCodes.Ready) {
      console.log(`The application has been initialized and is ready`);
      return;
    }
  }
}