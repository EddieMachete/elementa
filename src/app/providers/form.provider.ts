'use strict';

import { IFormProvider } from "@core/boundaries";
import { Form, FormField, FormFieldValue, FormSection } from "@core/domain";
import { IFormData, IFormFieldData, IFormSectionData } from "./iForm.data";
import { IHTTP } from "./iHTTP";

export class FormProvider implements IFormProvider {
  public constructor(private http: IHTTP, private dataSourceUri: string) {

  }

  public getForm(id: number): Promise<{form: Form; values: { [id: string]: FormFieldValue }}> {
    const endPoint: string = id === 1 ? `${this.dataSourceUri}ci-libmv.json` : `${this.dataSourceUri}test-form.json`;

    return new Promise((resolve, reject) => {
      this.http.get(endPoint)
      .then((response: IFormData) => {
        resolve(FormProvider.bindToNewForm(response));
      })
      .catch((reason) => reject(reason));
    });
  }

  private static bindToNewForm(formData: IFormData): { form: Form, values: { [id: string]: FormFieldValue }} {
    const form: Form = new Form();
    form.code = formData.Code;

    const values: { [id: string]: FormFieldValue } = {};

    formData.Sections.forEach(
      (formSectionData: IFormSectionData) => {
        const formSection: FormSection = new FormSection();
        formSection.name = formSectionData.Name;

        formSectionData.FormFields.forEach(
          (formFieldData: IFormFieldData) => {
            const formField: FormField = new FormField();
            formField.calculation = formFieldData.Calculation;
            formField.classificationTypeName = formFieldData.ClassificationTypeName;
            formField.classificationTypeValues = formFieldData.ClassificationTypeValues;
            formField.controlNote = formFieldData.ControlNote;
            formField.controlType = formFieldData.ControlType;
            formField.isIdentifying = formFieldData.IsIdentifying;
            formField.isRequired = formFieldData.Required;
            formField.label = formFieldData.Label;
            formField.labelNote = formFieldData.LabelNote;
            formField.name = formFieldData.Name;
            formField.nullFlavors = formFieldData.NullFlavors;
            formField.skipLogic = formFieldData.BranchLogic;
            formField.valueType = formFieldData.ValueType;

            formSection.setFormField(formField);

            const formFieldValue: FormFieldValue = new FormFieldValue();
            formFieldValue.name = formFieldData.Name;
            values[formFieldData.Name] = formFieldValue;
          }
        );
  
        form.addSection(formSection);
      }
    );

    return { form, values };
  }
}