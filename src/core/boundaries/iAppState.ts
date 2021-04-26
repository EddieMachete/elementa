'use strict';

import { Form } from "@core/domain";

export class StatusCodes {
  public static Initializing: number = 2;
  public static NotInitialized: number = 0;
  public static Ready: number = 1;
  
  public static LoadingForm: number = 101;
}

export interface IAppState {
  currentForm: Form;
  status: number;
}
