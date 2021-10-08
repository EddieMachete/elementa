'use strict';

import { FormSection } from '@core/domain';

export class FormField {
  public calculation: string;
  public classificationTypeName: string;
  public classificationTypeValues: string;
  public controlNote: string;
  public controlType: string;
  public isDynamic: boolean;
  public isIdentifying: boolean;
  public isRequired: boolean;
  public label: string;
  public labelNote: string;
  public name: string;
  public nullFlavors: string;
  public ordinal: number;
  public section: FormSection;
  public skipLogic: string;
  public skipped: boolean;
  public value: string;
  public valueType: string;
}
