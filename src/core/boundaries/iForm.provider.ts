'use strict';

import { Form, FormFieldValue } from "@core/domain";

export interface IFormProvider {
  getForm(id: number): Promise<{form: Form; values: { [id: string]: FormFieldValue }}>
}
