'use strict';

import { IFormProvider } from "@core/boundaries";
import { Form, FormField, FormSection } from "@core/domain";
import { IFormData, IFormFieldData, IFormSectionData } from "./iForm.data";
import { IHTTP } from "./iHTTP";

export class FormProvider implements IFormProvider {
  public constructor(private http: IHTTP, private dataSourceUri: string) {

  }

  public getForm(id: number): Promise<Form> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.dataSourceUri}ci-libmv.json`)
      .then((response: IFormData) => {
        resolve(FormProvider.bindToNewForm(response));
      })
      .catch((reason) => reject(reason));
    });
  }

  private static bindToNewForm(formData: IFormData): Form {
    const form: Form = new Form();
    form.code = formData.Code;

    formData.Sections.forEach(
      (formSectionData: IFormSectionData) => {
        const formSection: FormSection = new FormSection();
        formSection.name = formSectionData.Name;

        formSectionData.FormFields.forEach(
          (formFieldData: IFormFieldData) => {
            formSection.setFormField(
              Object.bind(
                new FormField(),
                formFieldData,
              )
            );
          }
        );
  
        form.addSection(formSection);
      }
    );

    console.log(form);

    return form;
  }
}