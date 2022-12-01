'use strict';

import { FormField } from '@core/domain';

export class FormSection {
  public name: string;
  public formFields: { [id: string]: FormField } = {};

  public setFormField(formField: FormField): void {
    formField.section = this;
    this.formFields[formField.name] = formField;
  }
}
