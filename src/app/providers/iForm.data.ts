'use strict';

export interface IFormData {
  Code: string;
  Id: number;
  Sections: IFormSectionData[];
}

export interface IFormSectionData {
  Name: string;
  FormFields: IFormFieldData[];
}

export interface IFormFieldData {
  BranchLogic: string;
  Calculation: string;
  ClassificationTypeName: string;
  ClassificationTypeValues: string;
  ControlNote: string;
  ControlType: string;
  IsIdentifying: boolean;
  Label: string;
  LabelNote: string;
  MaxValue: string;
  Name: string;
  NullFlavors: string;
  Required: boolean;
  ValueType: string;
}
