'use strict';

import { Form, FormFieldValue } from "@core/domain";

export class StatusCodes {
  public static Initializing: number = 2;
  public static NotInitialized: number = 0;
  public static Ready: number = 1;
  
  public static LoadingForm: number = 101;
}

export interface IAppState {
  currentFormMarkup: string;
  valuesLastUpdated: { [id: string]: FormFieldValue };
  values: { [id: string]: FormFieldValue }
  currentForm: Form;
  status: number;
}
