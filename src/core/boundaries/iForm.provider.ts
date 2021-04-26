'use strict';

import { Form } from "@core/domain";

export interface IFormProvider {
  getForm(id: number): Promise<Form>;
}