'use strict';

import { IFormProvider } from "@core/boundaries";
import { Form } from "@core/domain";
import { IHTTP } from "./iHTTP";

export class FormProvider implements IFormProvider {
  public constructor(private http: IHTTP, private dataSourceUri: string) {

  }

  public getForm(id: number): Promise<Form> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.dataSourceUri}/ci-libmv.json`)
      .then((response: any) => {
        resolve(response.length ? response : []);
      })
      .catch((reason) => reject(reason));
    });
  }
}