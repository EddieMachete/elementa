'use strict';

import { FormField, FormSection } from '@core/domain';

export class Form {
  public name: string;
  public code: string;
  public sections: FormSection[] = [];
  public formFields: { [id: string]: FormField } = {};
  public calculatedFields: { [id: string]: FormField } = {};

  public addSection(section: FormSection): void {
    this.sections.push(section);

    for (const [key, value] of Object.entries(section.formFields)) {
      this.formFields[key] = value;

      if (value.calculation) {
        this.calculatedFields[key] = value;
      }
    }
  }

  public getFormFieldBy(name: string): FormField {
    return this.formFields[name];
  }
}