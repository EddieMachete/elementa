'use strict';

export interface IFormData {
  Code: string;
  Sections: IFormSectionData[];
}

export interface IFormSectionData {
  Name: string;
  FormFields: IFormFieldData[];
}

export interface IFormFieldData {
  Name: string;
  Label: string;
  LabelNote: string;
  ControlType: string;
  ControlNote: string;
  ValueType: string;
  ClassificationTypeName: string;
  ClassificationTypeValues: string;
  NullFlavors: string;
  IsIdentifying: string;
  Required: string;
}
