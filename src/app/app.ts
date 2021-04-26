import { IAppState, IAppStoreProvider, IFormProvider, StatusCodes } from "@core/boundaries";
import { initializeAppUseCase } from "@core/usecases";
import { loadFormUseCase } from "@core/usecases/loadForm.useCase";
import {
  AppStoreProvider,
  FormProvider,
  XMLHTTP,
} from "./providers";
import { appStore } from "./store";

export class App {
  private appStoreProvider: IAppStoreProvider;
  private formProvider: IFormProvider;
  private unsubscribeFromStoreHandler: Function;

  public constructor(dataEndpoint: string) {
    const http:XMLHTTP = new XMLHTTP();
    this.appStoreProvider = new AppStoreProvider(appStore);
    this.formProvider = new FormProvider(http, dataEndpoint);

    this.unsubscribeFromStoreHandler = appStore.subscribe((state: IAppState, actionType: string) => this.stateChanged(state, actionType))

    initializeAppUseCase(this.appStoreProvider);
  }

  public loadForm(id: number): void {
    loadFormUseCase(this.appStoreProvider, this.formProvider, id);
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