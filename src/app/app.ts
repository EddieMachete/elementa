import { IAppState, IAppStoreProvider, IFormProvider, StatusCodes } from "@core/boundaries";
import { FormFieldValue } from "@core/domain";
import { initializeAppUseCase, updateFormFieldUseCase } from "@core/usecases";
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

  public updateFormField(formFieldName: string, value: string): void {
    const state = appStore.getState();

    if(!state.values[formFieldName]) {
      throw `Form field [${formFieldName}] was not found in the current form.`;
    }

    const updatedValues: { [id: string]: FormFieldValue } = {};
    const clonedFormFieldValue: FormFieldValue = state.values[formFieldName].clone();
    clonedFormFieldValue.valueString = value;
    updatedValues[formFieldName] = clonedFormFieldValue;

    updateFormFieldUseCase(this.appStoreProvider, state.currentForm, state.values, updatedValues);
  }

  public disconnect(): void {
    this.unsubscribeFromStoreHandler();
  }

  private stateChanged(state: IAppState, actionType: string): void {
    if (state.status === StatusCodes.Ready) {
      console.log(`The application has been initialized and is ready`);
      return;
    }

    for (const [key, value] of Object.entries(state.valuesLastUpdated)) {
      console.log(`[${key}] => ${value}`);
      // const field: HTMLElement = this.shadowRoot.getElementById(key);

      // if (value.errorMessage) {
      //   field.setAttribute('error', 'Please answer');
      // } else if (field.hasAttribute('error')) {
      //   field.removeAttribute('error');
      // }
    }

    // if (state.valuesLastUpdated.c) {
    //   this.shadowRoot.querySelector('[name=\'c\']').setAttribute('value', state.valuesLastUpdated.c.valueString);
    //   this.shadowRoot.querySelector('[name=\'d\']').setAttribute('value', state.valuesLastUpdated.d.valueString);
    // }
  }
}